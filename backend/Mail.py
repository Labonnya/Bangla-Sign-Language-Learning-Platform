import smtplib
from email.mime.text import MIMEText

def send_mail(content, to):
    message = MIMEText(content)
    message['Subject'] = "Test email"
    message['From'] = "labonnya1234@outlook.com"
    message['To'] = to 

    # Send message
    with smtplib.SMTP('smtp-mail.outlook.com', 587) as smtp:
        smtp.starttls()
        smtp.login('labonnya1234@outlook.com', 'bsse1208@gmail.com')
        smtp.send_message(message)
        