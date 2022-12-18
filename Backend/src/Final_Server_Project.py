'''
Server file - run on localhost
Command to run Server: uvicorn Final_Server_Project:app --reload

'''

from mrcnn import utils
import mrcnn.model as modellib
from mrcnn import visualize
from PIL import Image
from mrcnn.utils import resize_image
import easyocr
from mrcnn.config import Config
from pdf2image import convert_from_bytes
from fastapi import FastAPI,UploadFile, File,Response
import cv2
import numpy as np
import threading
from typing import List
import onlineSearch
import ast
Modelpath="./mask_rcnn_object_0010.h5"


class CustomConfig(Config):
    def __init__(self, num_classes):
        classes_number = num_classes
        super().__init__()
    NAME = "object"
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1
    NUM_CLASSES = 1 + 1
    IMAGE_MIN_DIM = 512
    IMAGE_MAX_DIM = 512
    STEPS_PER_EPOCH = 500
    VALIDATION_STEPS = 5
    DETECTION_MIN_CONFIDENCE = 0.9

class InferenceConfig(CustomConfig):
    GPU_COUNT = 1
    IMAGES_PER_GPU = 1


def get_google_links(q_text):
  return list(search(q_text,stop=3))


def load_inference_model(num_classes, model_path):
    inference_config = InferenceConfig(num_classes)
    # Recreate the model in inference mode
    model = modellib.MaskRCNN(mode="inference",
                              config=inference_config,
                              model_dir=model_path)
    model.load_weights(model_path, by_name=True)
    return model, inference_config

def extract_questions_image(rois,img,factor=2337):
    img_arr=[]
    img2=img
    q_arr=[]
    list_of_links = []
    for i in rois:
        roi=i
        img=Image.fromarray(img2)
        l = (roi[1])*(factor/512)
        t = roi[0]*(factor/512)
        ri = (roi[3])*(factor/512)
        b = roi[2]*(factor/512)
        img = img.crop((l, t, ri, b))
        img=np.asarray(img)
        img_arr.append((img,[t,l,b,ri]))
    img_arr.sort(key = lambda x: x[1][0])
    threads=[]
    def ocrpredict(i):
        text = language.readtext(i[0],paragraph=True)
        s=' '.join([k[1] for k in text])
        list_of_links.append(get_google_links(s))
        q_arr.append(s)
    for i in img_arr:
        t=threading.Thread(target=ocrpredict, args=[i])
        t.start()
        threads.append(t)
    for i in range(len(threads)):
        threads[i].join()
        visualize.display_images([img_arr[i][0]], cmap="Blues",cols=1)
    print()
    return q_arr,[i[1] for i in img_arr],list_of_links

def input_as_bytes(byte):
    return [np.asarray(i) for i in convert_from_bytes(byte, dpi=150, thread_count=2, grayscale=True, fmt="jpg")]


model, inference_config=load_inference_model(1,Modelpath)
language = easyocr.Reader(['en'])

imgtry=cv2.imread("./dataset/aa04eb5a-8-1.jpg")
imgtry=cv2.cvtColor(imgtry,cv2.COLOR_BGR2RGB)


def final_result_from_nparray(imgtry):
    print("tryshape initial",imgtry.shape)
    factor=imgtry.shape[0]
    imgtry2, window, scale, padding, crop=resize_image(imgtry,max_dim=512)
    results=model.detect([imgtry2], verbose=1)
    r = results[0]
    rois=[]
    for i,j in zip(r['scores'],r['rois']):
        if i>=0.95:
            rois.append(j)
    imgtry, window, scale, padding, crop=resize_image(imgtry,max_dim=factor)
    print("extracting text for images on one page")
    return extract_questions_image(rois,imgtry,factor)


app = FastAPI()

#--------------- App -----------------------------

@app.post("/multiplepapertopics")
def multiplepaperTopics(response: Response,files: List[bytes]=File(...)):
    response.headers["Access-Control-Allow-Origin"] = "*"
    #run model
    paperimages=[]
    paperimagetag=[]
    paperimagesformodal=[]
    paperimagefactor=[]
    for i,file in enumerate(files):
        for page in input_as_bytes(bytearray(file)):
            paperimagesformodal.append(resize_image(page,max_dim=512)[0])
            paperimagetag.append(i+1)
            factor=page.shape[0]
            paperimagefactor.append(factor)
            paperimages.append(resize_image(page,max_dim=factor)[0])
    print("predicting rois of ",len(paperimages))
    results=[]
    def predictroi(image):
        results.append(model.detect([image], verbose=1)[0])
    threads=[]
    for image in paperimagesformodal:
        t=threading.Thread(target=predictroi, args=[image])
        t.start()
        threads.append(t)
    for i in range(len(threads)):
        threads[i].join()
    
    questions=[]
    print("extracting question images from rois")
    for index,result in enumerate(results):
        rois=[]
        for i,j in zip(result['scores'],result['rois']):
            if i>=0.95:
                rois.append(j)
        img_arr=[]
        factor=paperimagefactor[index]
        img=Image.fromarray(paperimages[index])
        for roi in rois:
            l = (roi[1])*(factor/512)
            t = roi[0]*(factor/512)
            ri = (roi[3])*(factor/512)
            b = roi[2]*(factor/512)
            temp_img = img.crop((l, t, ri, b))
            temp_img=np.asarray(temp_img)
            img_arr.append((temp_img,[t,l,b,ri]))
        img_arr.sort(key = lambda x: x[1][0])
        papertag=paperimagetag[index]
        count=1
        for i,j in img_arr:
            questions.append(("P"+str(papertag)+".Q"+str(count),i))
            count+=1
    print("no of questions extracted from rcnn model are",len(questions)) 
    # threding to get ocr
    print("extracting question text from question images")
    def fetchtextFromImage(tag,i):
        text = language.readtext(i,paragraph=True)
        s=' '.join([k[1] for k in text])
        result[tag]=s
    threads=[]
    for i,j in questions:
        t=threading.Thread(target=fetchtextFromImage, args=[i,j])
        t.start()
        threads.append(t)
    result={}
    print("no of threds created for ocr",len(threads))
    for i in range(len(threads)):
        threads[i].join()
    ## threading to get online result
    print("extracting topics from questions",)
    print([i[0] for i in questions])
    print()
    data = onlineSearch.fetchOnlineAns(result)
    return data


@app.get("/")
async def read_root(response: Response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    return "corpp_dic"

@app.post("/uploadpaper")
async def upload_paper(response: Response,file: bytes=File(...)):
    response.headers["Access-Control-Allow-Origin"] = "*"
    papers_array = input_as_bytes(bytearray(file))
    corpp_dic={}
    counter=0
    for paper in papers_array:
      res=final_result_from_nparray(paper)
      corpp_dic[str(counter)]={'q_arr':res[0],'rois':res[1],'ans_arr':res[2]}
      counter+=1
    return corpp_dic
  




