import smtplib
from email.mime.text import MIMEText

def send_mail(content, to):
    message = MIMEText(content)
    message['Subject'] = "Test email"
    message['From'] = "abj-paul@outlook.com"
    message['To'] = to 

    # Send message
    with smtplib.SMTP('smtp-mail.outlook.com', 587) as smtp:
        smtp.starttls()
        smtp.login('abj-paul@outlook.com', 'bristi pothe mukti dilo gaan_12')
        smtp.send_message(message)
        