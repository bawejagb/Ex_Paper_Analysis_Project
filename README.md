# Ex_Paper_Analysis_Project
Exam Paper Analysis is a tool for the students to analyze previous exam paper to extract important topics and answers links for each question.

<br>

<img align="right" src='https://github.com/Aanvikshiki/Ex_Paper_Analysis_Project
/blob/main/resources/project_demo.gif' align='center' width='50%'>

<br>
# Methodology
1. User run the program on localhost.
2. When the user lands onto the landing page he will be asked to upload question papers.
3. After uploading the question papers user will click the analyse option. Which will send a post request via
FastAPI to the end point. As the frontend and backend (hosted on ngrok) is connected to each other by the
means of FastAPI.
4. Call is made to the function having the name as that of the end point and the files as the parameters which
has been uploaded by the user.
5. These files are converted into byte format.
6. The output is sent back to the frontend in the JSON format containing two dictionaries’ Link and Topic.
7. Link contains question number, question itself and three links of that question. And Topic contains topic
name and the question numbers. So, couple of function calls are made to achieve this which contains the
trained model called Masked Region-based Convolutional Neural Network (Mask-RCNN).
8. To Detect Questions from the papers, we have Built a Deep learning model using a Masked Region-based
Convolutional Neural Network (Mask-RCNN) using a library by Matterport. For training, we created our
own Dataset using the tool label-studio, by manually selecting the region of the questions which helps us
make coco dataset type annotations. We labeled each question’s boundary points as a mask for the
question.
9. For training, we use transfer learning on trained coco weights with 10 epochs, 500 steps per epoch, a
learning rate of 0.001, using 512 by 512 -pixel images as input, and only head layers (i.e., mrcnn, rpn, and
fpn layers according to mrcnn documentation) in the learning process.
10. After Training, the model is saved in ‘.h5’ format in the local directory. And when the input image is
provided to this trained model it returns the rois.
Page 14 of 58
11. After our model has provided us with the rois, now we scaled these rois according to the original image so
that we can crop the accurate images of our questions.
12. After getting the image of each question we used a tool called OCR (Optical Character Recognition) which
takes these images as an input and convert them into text format by the help of “easyocr” library.

# To run this
You will have to install some libraries. `Run:`
1. `pip install tensorflow`
2. `pip install numpy`
3. `pip install matplotlib`
4. `pip install scikit-image`
5. `pip install keras`
5. `pip install opencv-python`
5. `pip install h5py`
5. `pip install pycocotools`
5. `pip install easyocr`
5. `pip install fastapi`
5. `pip install threading`
5. `pip install nltk`
5. `pip install operator`
5. `pip install ecommercetools`
5. `pip install PIL`
5. `pip install pdf2image`
5. `pip install cv2`

# Running the program

**Backend**- Run command on terminal: uvicorn Final_Server_Project:app --reload

**Frontend**- Run command on terminal: npm start
# Collaborators

1. Gaurav Baweja
2. Jagrit Nokwal
3. Arsh Raina
4. Rohit Singla

