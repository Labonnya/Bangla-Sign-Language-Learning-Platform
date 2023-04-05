from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
import sqlite3

from fastapi import FastAPI, Request;
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import unquote

from User import User
from AuthServices import *
from constants import *
from Mail import *
from Model import *
from models import *

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from fastapi.responses import JSONResponse
import sqlite3

drop_table()
create_user_table()

app = FastAPI()

class Question(BaseModel):
    id: int
    label: str
    choice1: str
    choice2: str
    choice3: str
    choice4: str
    answer: str


@app.get("/getquestions")
async def get_questions():
    conn = sqlite3.connect("bsl.db")
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM questions")
    data = cursor.fetchall()
    questions = []
    for question in data:
        questions.append({
            "id":question[0],
            "label":question[1],
            "choice1":question[2],
            "choice2":question[3],
            "choice3":question[4],
            "choice4":question[5],
            "answer":question[6]
        })
    conn.close()
    return questions




@app.get("/")
def root():
    return "Hello World!"


@app.post("/register/")
async def register_user(request: Request):
    userdata = await request.json()
    print("register/:" +str(userdata))

    user = User(userdata["username"], userdata["password"], userdata["institution"], userdata["email"], userdata["role"])
    otp = createOTPForUser(user)
    print("#####Generated OTP: "+str(otp)) # mail OTP
    send_mail("Please enter the following OTP in BSL Learning Platform to confirm your account! "+str(otp), user.email)
    return {"Status":"Registration Success", "Next Operation":"Verify OTP to confirm your account.", "OTP":otp }

@app.post("/register/OTP/")
async def verify_otp(request: Request):
    userdata = await request.json()
    print("register/OTP/:" +str(userdata))

    user = User(userdata["username"], userdata["password"], userdata["institution"], userdata["email"], userdata["role"])
    if validateOTP(user, userdata["OTP"]) == False: 
        return WRONG_OTP
    
    add_user(user)
    authToken = createSession(user)
    return {"Status":"OTP Success", "authToken": authToken }

@app.post("/login/")
async def login_user(request: Request):
    userdata = await request.json()
    print("login/:" +str(userdata))

    checkVal = checkIfUserExists(userdata["username"], userdata["password"])
    if checkVal == False:
        return WRONG_LOGIN_CREDENTIALS
    userdata = checkVal
    user = User(userdata[1], userdata[2], userdata[3], userdata[4], userdata[5])

    authToken = createSession(user)
    return {"Status":"Login Success", "authToken": authToken, "username": user.username, "email": user.email, "institution": user.institution, "role": user.role}

@app.post("/login/forgot_password/")
async def user_forgot_password(request: Request):
    userdata = await request.json()
    print("/login/forgot_password/:" +str(userdata))

    OTP = forget_password(userdata["email"])

    return {"Status":"Forget Password OTP Success", "OTP": OTP }

@app.post("/login/forgot_password/OTP")
async def user_forgot_password(request: Request):
    userdata = await request.json()
    print("/login/forgot_password/:" +str(userdata))

    if update_password(userdata["email"], userdata["OTP"], userdata["new_password"]) == False: return FORGOT_PASSWORD_OPERATION_FAILED

    return {"Status":"Forget Password Success", "Next Action": "Please Login now." }

@app.post("/logout/")
async def user_logout_controller(request: Request):
    userdata = await request.json()
    print("/logout/:" +str(userdata))

    deleteSession(userdata["authToken"])
    return {"Status":"Logout Successful" }


class VideoData(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    vdesc: Optional[str] = None
    videoUrl: str


@app.post("/submit_form")
async def submit_form(video_data: VideoData):
    conn = sqlite3.connect('bsl.db')
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS videos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)")
    cursor.execute("CREATE TABLE IF NOT EXISTS videoDetail (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, vdesc TEXT, videoUrl TEXT, FOREIGN KEY(title) REFERENCES videos(title) ON DELETE CASCADE)")
    cursor.execute("INSERT INTO videos (title, description) VALUES (?, ?)", (video_data.title, video_data.description))
    cursor.execute("INSERT INTO videoDetail (title, vdesc, videoUrl) VALUES (?, ?, ?)", (video_data.title, video_data.vdesc, video_data.videoUrl))

    conn.commit()
    conn.close()
    return JSONResponse(content={"message": "Form data submitted successfully"})

@app.post("/edit_form")
async def edit_form(video_data: VideoData):
    conn = sqlite3.connect('bsl.db')
    cursor = conn.cursor()
    cursor.execute("SELECT title FROM videos WHERE title=?", (video_data.title,))
    result = cursor.fetchone()
    if result is None:
        # If the video with the given title is not found, return an error message
        return JSONResponse(content={"error": "Video not found"})
    video_title = result[0]
    cursor.execute("INSERT INTO videoDetail (title, vdesc, videoUrl) VALUES (?, ?, ?)", (video_title, video_data.vdesc, video_data.videoUrl))
    conn.commit()
    conn.close()
    return JSONResponse(content={"message": "Form data updated successfully"})

@app.get("/fetch_video_data")
async def fetch_video_data():
    conn = sqlite3.connect('bsl.db')
    cursor = conn.cursor()
    cursor.execute("SELECT v.title, v.description, vd.title, vd.vdesc, vd.videoUrl FROM videos v JOIN videoDetail vd ON v.title = vd.title ORDER BY v.title")
    data = cursor.fetchall()
    conn.close()
    return JSONResponse(content={"data": data})

@app.delete('/delete_course')
async def delete_course(titleVideo: str):
    conn = sqlite3.connect('bsl.db')
    cursor = conn.cursor()
    cursor.execute('DELETE from videos where title=?', (titleVideo,))
    conn.commit()
    conn.close()
    return {'message': 'Record deleted successfully'}


# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
