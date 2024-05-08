const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    let notification = ''
    if (message.startsWith('wrong')){
      notification = "error"
    } else if (message.includes('added')){
      notification = "added"
    }
    return(
      <div className={notification}>
        {message}
      </div>
    )
  }
  
  export default Notification