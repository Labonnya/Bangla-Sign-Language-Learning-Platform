from pydantic import BaseModel

class User(BaseModel):
    username : str = "Abhijit Paul"
    password: str = "stu458"
    role: str = "Teacher"
    institution: str = "IIT,DU"
    email: str = "bsse1201@iit.du.ac.bd"

    def __init__(self, username, password, institution, email, role) -> None:
        super().__init__()
        self.institution = institution
        self.username = username
        self.password = password
        self.role = role

