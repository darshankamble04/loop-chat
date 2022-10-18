
export const IsInContact=(title,allContacts)=>{
    // eslint-disable-next-line
    let sender = allContacts.map((contact) => {
        if (contact.id === title) {
            return contact.name
        }
    })
    for (let i = 0; i < sender.length; i++) {
        if(sender[i]){
            return sender[i]
        }
    }
    return title
}

export const dateChecks=(date)=>{
    const todaysDate = new Date().toLocaleDateString()
    const yesterday = new Date((new Date()).valueOf() - 1000*60*60*24).toLocaleDateString();
    if(date===todaysDate){
        return "Today"
    }
    else if(date===yesterday){
        return "Yesterday"
    }
    else{
        return date;
    }
}
