import time
import json

import cv2
import pickle
import face_recognition
import time



def add_data(person):
    # Sample data (dictionary)
    data = {
        "name": f"{person}",
    }

    # Serialize the data to JSON
    json_data = json.dumps(data)

    # Write JSON data to a file
    with open("TEACHERS\\data.json", "w") as json_file:
        json_file.write(json_data)



print("Loading Encode File ... ")
file = open('EncodeFile.p','rb')
encodeListKnownWithIds = pickle.load(file)
file.close()
encodeListKnown, studentIds = encodeListKnownWithIds



cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)


start_time = time.time()
person = ""

add_data("failed")

while True:
    success, img = cap.read()

    imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

    faceCurFrame = face_recognition.face_locations(imgS)
    encodeCurFrame = face_recognition.face_encodings(imgS, faceCurFrame)

    for encodeFace, faceLoc in zip(encodeCurFrame,faceCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown,encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown,encodeFace)
        index =0

        data =-1

        for i in matches:
            index += 1
            if i == True:
                data = index


        
        if data == 1:
            person = "t1"
        if data == 2:
            person = "t2"
        if data == 3:
            person = "t3"
        if data == -1 :
            person = "failed"

        add_data(person)


    cv2.imshow("Face Attendance", img)
    cv2.waitKey(1)

    # Check if 5 seconds have passed
    if time.time() - start_time >= 4:
        break

cap.release()
cv2.destroyAllWindows()