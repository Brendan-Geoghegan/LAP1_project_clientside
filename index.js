// const { moduleExpression } = require("@babel/types");

const httpLink = "https://team-name404.herokuapp.com/entries/"

let object = {
    entry: "",
    comments: [],
    reactions: {
        smiley: 0,
        sad: 0,
        like: 0,
    },
    gif: ""
};




const gifForm = document.getElementById('gif_form')
const gifNotif = document.getElementById('gifNotification')
gifForm.addEventListener('submit', async (e) =>{
    try{
        e.preventDefault()
        console.log('gif input test')
        console.log(e.target.gifInput.value)
        const gifResult = e.target.gifInput.value
        const gifData = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=0S3uHG2JHXGiL6ooiPgmsyrS25ufBlGf&q=${gifResult}&limit=20&offset=0&rating=g&lang=en`)
        const gifJson = await gifData.json();
        console.log(gifJson)
        

        object.gif = gifJson.data[(Math.floor(Math.random()*20))].images.original.url

        gifForm.style.display = "none"
        gifNotif.style.display = "block" 
        e.target.gifInput.value = "";
    } catch (err) {
        console.log(err);
        window.alert("Please use a valid name to search for gifs");
        e.target.gifInput.value = "";
    }
})

// Initialise main page to display entries

const oneEntry = (i)  => {
    let div = document.createElement('div')
        div.className = 'div_post'
        div.setAttribute("id", i.id)
        // section.appendChild(div)
        section.insertBefore(div, section.children[0])
        
        let divTextAndImage = document.createElement('div')
        divTextAndImage.className = "div_TextAndImage"
        div.appendChild(divTextAndImage)

        let p = document.createElement('p')
        p.className = "p_entry"
        p.textContent = i.entry
        divTextAndImage.appendChild(p);
        
        let img = document.createElement('img')
        img.src = i.gif
        img.style.width = "10em"
        divTextAndImage.appendChild(img)

        let divButtons = document.createElement('div')
        divButtons.className = 'div_Buttons'
        div.appendChild(divButtons)

        let reaction_smile = document.createElement('button')
        // reaction_smile.id = `smile${i.id}`
        reaction_smile.setAttribute("id", `smile${i.id}`)
        reaction_smile.textContent = `😀 ${i.reactions.smiley}`
        reaction_smile.addEventListener('click', async () => {
            console.log(`${httpLink}${i.id}/reaction`)
            await fetch(`${httpLink}${i.id}/reaction`, {
            method: "PATCH",

            body: JSON.stringify({reaction: "smiley"}),
                
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            const rawSmileyData = await fetch(`${httpLink}count/${i.id}/smiley`);
            const smileyData = await rawSmileyData.json();
            console.log(smileyData);
            reaction_smile.textContent = `😀 ${smileyData}`;
            // Page.MaintainScrollPositionOnPostBack = True
        })
        divButtons.appendChild(reaction_smile)

        let reaction_sad = document.createElement('button')
        reaction_sad.id = `sad${i.id}`
        reaction_sad.textContent = `😢 ${i.reactions.sad}`
        reaction_sad.addEventListener('click', async () => {
            console.log(`${httpLink}${i.id}/reaction`)
            await fetch(`${httpLink}${i.id}/reaction`, {
            method: "PATCH",

            body: JSON.stringify({reaction: "sad"}),
                
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            const rawSadData = await fetch(`${httpLink}count/${i.id}/sad`);
            const sadData = await rawSadData.json();
            console.log(sadData);
            reaction_sad.textContent = `😢 ${sadData}`;
            // window.location.href=window.location.href
        })
        divButtons.appendChild(reaction_sad)

        let reaction_like = document.createElement('button')
        reaction_like.id = `like${i.id}`
        reaction_like.textContent = `👍 ${i.reactions.like}`
        reaction_like.addEventListener('click', async () => {
            console.log(`${httpLink}${i.id}/reaction`)
            await fetch(`${httpLink}${i.id}/reaction`, {
            method: "PATCH",

            body: JSON.stringify({reaction: "like"}),
                
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
            })
            const rawLikeData = await fetch(`${httpLink}count/${i.id}/like`);
            const likeData = await rawLikeData.json();
            console.log(likeData);
            reaction_like.textContent = `👍 ${likeData}`;
            // window.location.href=window.location.href
        })
        divButtons.appendChild(reaction_like)

        let line = document.createElement('hr')
        div.appendChild(line)

        // ############################ REVEAL REPLIES ########################################

        let revealButton = document.createElement('button')
        revealButton.id = `reveal${i.id}`
        revealButton.textContent = `Show ${i.comments.length} Comments`
        revealButton.addEventListener('click', async () =>{
            const comments = await fetch(`${httpLink}${i.id}`)
            console.log("comments", comments);
            const commentsJSON = await comments.json();
            console.log("commentsJSON", commentsJSON);
            console.log("commentsJSON.comments", commentsJSON[0].comments)
            let commentBox = document.createElement('div')
                commentBox.className = "commentBox"
                div.append(commentBox)

            commentsJSON[0].comments.forEach(comment => {
                console.log(comment)
                let p = document.createElement('p')
                p.className= "comment"
                p.textContent = comment
                commentBox.append(p)
            })
            revealButton.style.display = "none"


            let commentForm = document.createElement('form')
            commentForm.className = "commentForm"
            commentForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                console.log("testing eTarget", e.target.postReply.value)
                await fetch(`${httpLink}${i.id}/comments`, {
                    method: "PATCH",

                    body: JSON.stringify({comment: e.target.postReply.value}),
                
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                        }
            
                })
                e.target.postReply.value = "";
                const commentsRaw = await fetch(`${httpLink}${i.id}/comments`);
                const newCommentsArray = await commentsRaw.json();
                console.log(newCommentsArray);
                console.log(newCommentsArray[newCommentsArray.length-1]);
                const newComment = document.createElement("p");
                newComment.textContent = newCommentsArray[newCommentsArray.length-1];
                newComment.className = "comment";
                commentBox.appendChild(newComment);

            })
            div.append(commentForm)

            let commentForm_input = document.createElement('textarea')
            commentForm_input.id = "postReply"
            commentForm_input.name = "postReply"
            commentForm_input.rows = "4"
            commentForm_input.cols = "40"
            commentForm_input.maxLength = "200"
            commentForm_input.required = true;
            commentForm_input.placeholder = "  Submit a comment here..."
            commentForm.append(commentForm_input)

            let commentForm_submit = document.createElement('input')
            commentForm_submit.type = "submit"
            commentForm_submit.className = "sendButton"
            commentForm_submit.value = "Submit reply"
            commentForm.append(commentForm_submit)

        })
        divButtons.append(revealButton)
}


const form = document.getElementById('submit_form')


form.addEventListener('submit', async (e) => {
    e.preventDefault()
    // const postText = document.getElementById('postText').value
    console.log("postText test", e.target.postText2)
    
    const postGif = document.getElementById('addGif')

    object.entry = e.target.postText2.value,
    


    await fetch(`${httpLink}`, {
        method: "POST",

        body: JSON.stringify(object),

        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    e.target.postText2.value = "";
    const newEntriesRawData = await fetch(`${httpLink}`);
    const newEntriesData = await newEntriesRawData.json();
    const newEntry = newEntriesData[newEntriesData.length - 1];
    oneEntry(newEntry);
    gifNotif.style.display = "none"
    gifForm.style.display = "flex"
    const gifSearch = document.getElementById("gifInput")
    gifSearch.value = "";
    object.gif = "";
    // section.innerHTML = "";
    // fetchData();
    // scrollTo({
    //     "scroll-height": 10000000000000,
    //     behavior: "smooth"
    // })
    // const scrollToBottom = () => {
    //     const element = document.querySelector("body");
    //     element.scrollBottom = element.scrollHeight;
    // }
    // scrollToBottom();
    
    // scrollTo(0, document.html.scrollHeight);
})

const section = document.getElementById('entries')
console.log(section)

async function fetchData(){
    const rawData = await fetch(`${httpLink}`)
    const commentData = await rawData.json()
    console.log(commentData, "from fetch data function")
    // const reverseData = commentData.reverse();
    // console.log(reverseData);

    commentData.forEach((i) => {
        oneEntry(i);
    });
}

fetchData()

let sunIcon = document.getElementById('sunIcon')
let styleLink =  document.getElementById('styleLink')
let moonIcon = document.getElementById('moonIcon')

// sunIcon.addEventListener('click', () =>{
//     styleLink.setAttribute('href', "style_light.css")
// })

sunIcon.addEventListener('click', changeToLightMode)

function changeToLightMode() {
    styleLink.setAttribute('href', "style_light.css")
}

moonIcon.addEventListener('click', () => {
    styleLink.setAttribute('href', "style_dark.css")
})

function refresh(){
    window.location.href=window.location.href
}

module.exports = changeToLightMode

