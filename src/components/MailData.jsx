import React from 'react'

function MailData({mail}) {
    console.log(mail);
  return (

    <div>
        <p>{mail.bodyPreview}</p>
    </div>
  )
}

export default MailData