import datetime 
from Model import *
from Mail import *

waitingForOTPVerification = []
running_sessions = []
forget_password_sessions = []

def createOTPForUser(user):
    OTP = str(hash(str(user)+str(datetime.datetime.now())))
    waitingForOTPVerification.append([user, OTP])
    return OTP

def createSession(user):
    session = []
    session.append(user)

    authToken = str(hash(str(user)+str(datetime.datetime.now())))
    session.append(authToken)

    running_sessions.append(session)
    return authToken

def deleteSession(authToken):
    for session in running_sessions:
        if str(authToken) == str(session[1]): 
            running_sessions.remove(session)
            return True 
    return False

def add_user(user): # OUTLIER
    insert_user_data(user.username, user.password, user.institution, user.email, user.role)

def validateOTP(user, OTP):
    for index, smolList in enumerate(waitingForOTPVerification):
        waiting_user = smolList[0]
        otp = smolList[1]
        print(str(otp)+"=="+str(OTP)+", result="+str(str(otp)==str(OTP)))
        if str(OTP)==str(otp) and user==waiting_user: 
            waitingForOTPVerification.remove([user, otp])
            return True 
    return False

def checkIfUserExists(username, password):
    data = get_user_data(username, password)
    if len(data) !=0: return data[0]
    return False 

def forget_password(email):
    OTP = str(hash(str(email)+str(datetime.datetime.now())))

    send_mail("Please enter the following OTP in BSL Learning Platform to change your account password! "+str(OTP), email)
    forget_password_sessions.append([email, OTP])
    return OTP 

def update_password(email, OTP, newPassword):
    for fpsession in forget_password_sessions:
        fp_email = fpsession[0]
        fp_otp = fpsession[1]

        if str(fp_otp)==str(OTP) and email==fp_email:
            update_password_in_db(email, newPassword)
            return True
    return False

    
