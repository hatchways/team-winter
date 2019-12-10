import re



def convertAllMessages(user, prospects, template):
    prospectsList = []
    for prospect in prospects:
        prospectsList.append(replaceVariables(user, prospect, template.body))
    return prospectsList

def replaceVariables(user, prospect, message):
    message = re.sub(r'\[name\]', prospect.name, message)
    message = re.sub(r'\[from_first_name\]', user.first_name, message)
    return mapEmailByMessage(prospect.email, message)

def mapEmailByMessage(email, message):
    return {'email' : email, 'message' : message}
