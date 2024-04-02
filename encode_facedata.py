import cv2
import face_recognition
import pickle 
import os


floderpath = 'DATA'

pathlist = os.listdir(floderpath)
print(pathlist)

imagelist = []
studentslist = []

for path in pathlist:
    imagelist.append( cv2.imread(os.path.join(floderpath, path)) )
    studentslist.append( os.path.splitext(path)[0] )

print(studentslist)


def findEncodings(imagesList):
    encodeList = []
    for img in imagesList:
        img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img) [0]
        encodeList.append(encode)

    return encodeList

print ("Encoding Complete")
encodeListKnown = findEncodings(imagelist)
print(encodeListKnown)
encodeListKnownWithIds = [encodeListKnown , studentslist]
print("Encoding Complete")


file = open("EncodeFile.p", 'wb')
pickle.dump(encodeListKnownWithIds, file)
file.close()