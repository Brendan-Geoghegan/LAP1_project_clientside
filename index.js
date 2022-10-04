const form = document.getElementById('submit_form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // const postText = document.getElementById('postText').value
    console.log("postText test", e.target.postText)
    
    const object = {
        entry: e.target.postText.value,
        comments: [],
        reactions: {
            smiley: 0,
            sad: 0,
            like: 0,
        },
        gif: ""
    };

    fetch("http://localhost:3000/entries/", {
        method: "POST",

        body: JSON.stringify(object),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
})

const section = document.getElementById('entries')
console.log(section)

async function fetchData(){
    const rawData = await fetch("http://localhost:3000/entries/")
    const commentData = await rawData.json()
    console.log(commentData, "from fetch data function")

    commentData.forEach((i) => {
        let div = document.createElement('div')
        div.className = 'div_post'
        div.setAttribute("id", i.id)
        section.appendChild(div)
        
        let p = document.createElement('p')
        p.className = "p_entry"
        p.textContent = i.entry
        div.appendChild(p);

        let reaction_smile = document.createElement('button')
        // reaction_smile.id = `smile${i.id}`
        reaction_smile.setAttribute("id", `smile${i.id}`)
        reaction_smile.textContent = `Smile: ${i.reactions.smiley}`
        reaction_smile.addEventListener('click', async () => {
            console.log(`http://localhost:3000/entries/${i.id}/reaction`)
            await fetch(`http://localhost:3000/entries/${i.id}/reaction`, {
            method: "PATCH",

            body: JSON.stringify({reaction: "smiley"}),
                
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            window.location.href=window.location.href
            // Page.MaintainScrollPositionOnPostBack = True
        })
        div.appendChild(reaction_smile)

        let reaction_sad = document.createElement('button')
        reaction_sad.id = `sad${i.id}`
        reaction_sad.textContent = `Sad: ${i.reactions.sad}`
        reaction_sad.addEventListener('click', async () => {
            console.log(`http://localhost:3000/entries/${i.id}/reaction`)
            await fetch(`http://localhost:3000/entries/${i.id}/reaction`, {
            method: "PATCH",

            body: JSON.stringify({reaction: "sad"}),
                
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            window.location.href=window.location.href
        })
        div.appendChild(reaction_sad)

        let reaction_like = document.createElement('button')
        reaction_like.id = `like${i.id}`
        reaction_like.textContent = `like: ${i.reactions.like}`
        reaction_like.addEventListener('click', async () => {
            console.log(`http://localhost:3000/entries/${i.id}/reaction`)
            await fetch(`http://localhost:3000/entries/${i.id}/reaction`, {
            method: "PATCH",

            body: JSON.stringify({reaction: "like"}),
                
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            window.location.href=window.location.href
        })
        div.appendChild(reaction_like)

        // ############################ REVEAL REPLIES ########################################

        let revealButton = document.createElement('button')
        revealButton.id = `reveal${i.id}`
        revealButton.textContent = `Show ${i.comments.length} Comments`
        revealButton.addEventListener('click', async () =>{
            const comments = await fetch(`http://localhost:3000/entries/${i.id}`)
            console.log("comments", comments);
            const commentsJSON = await comments.json();
            console.log("commentsJSON", commentsJSON);
            console.log("commentsJSON.comments", commentsJSON[0].comments)
            commentsJSON[0].comments.forEach(comment => {
                console.log(comment)
                
                let p = document.createElement('p')
                p.className= "test test"
                p.textContent = comment
                div.append(p)
            })
            revealButton.style.display = "none"

            // let reply = document.createElement('button')
            // reply.textContent= `Reply`

            let commentForm = document.createElement('form')
            commentForm.className = "commentForm"
            commentForm.addEventListener('submit', async (e) => {
                console.log("testing eTarget", e.target.postReply.value)
                await fetch(`http://localhost:3000/entries/${i.id}/comments`, {
                    method: "PATCH",

                    body: JSON.stringify({comment: e.target.postReply.value}),
                
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        }
            
                })
            })
            div.append(commentForm)

            let commentForm_input = document.createElement('input')
            commentForm_input.type = "text"
            commentForm_input.id = "postReply"
            commentForm.append(commentForm_input)

            let commentForm_submit = document.createElement('input')
            commentForm_submit.type = "submit"
            commentForm_submit.value = "Submit reply"
            commentForm.append(commentForm_submit)
        

        div.append(reply)

        })
        div.append(revealButton)

    });
}

fetchData()

// .then(() => {
//     const smileButton = document.querySelectorAll('.div_post')
//     console.log("testing smile button", smileButton)

//     smileButton.addEventListener('click', () => {
//     console.log('testing smile')}
// )
// })



// smileButton.addEventListener('click', () => {

//     console.log('testing smile')

//     fetch(`http://localhost:3000/entries/1`, {
//         method: "PATCH",

//         body: JSON.stringify(
//             {reactions: smiley}
//         ),

//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
// })


// const functionIncrement = async () => {
//     console.log('testing increment')
//     fetch(`http://localhost:3000/entries`, {
//         method: "PATCH",

//         body: JSON.stringify(
//             {reactions: smiley}
//         ),

//         headers: {
//             "Content-type": "application/json; charset=UTF-8"
//         }
//     })
// }
