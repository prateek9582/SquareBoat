const signup = document.querySelector(".signup");
const login = document.querySelector(".login");
const theatre = document.querySelector(".theatre");
const movie = document.querySelector(".newmovie");
const bookings = document.querySelectorAll(".booking");

if(signup){
    signup.addEventListener("submit", function(event){
        event.preventDefault();
        const arrInput = document.getElementsByTagName("input");
        console.log(arrInput);
        const name = arrInput[0].value;
        const email = arrInput[1].value;
        const password = arrInput[2].value;
        const phone = arrInput[3].value;
        const role = document.getElementById("role").value;

        sendSignUpReq(name, email, password, phone, role);
    })
}

async function sendSignUpReq(name, email, password, phone, role){
    try{
        const resp = await axios.post("/api/users/signup", {name, email, password, phone, role});
        console.log(resp);
        if(resp.data.succ){
            alert("Successfully signed up");
            location.replace("/me");
        }
        else{
            alert("Something went wrong");
        }
    }catch(err){
        console.log(err);
    }
}

if(login){
    login.addEventListener("submit",function(event){
        event.preventDefault();
        console.log("sad");
        const arrInput = document.getElementsByTagName("input");
        const email = arrInput[0].value;
        const password = arrInput[1].value;

        sendLogInReq(email,password);
    })
}

async function sendLogInReq(email,password){
    try{
        const resp = await axios.post("/api/users/login",{email, password});
        if(resp.data.succ){
            alert("user logged in");
            location.replace("/me");
        }
        else{
            alert("Something went wrong")
        }
    }catch(err){
        console.log(err);
    }
}

if(theatre){
    theatre.addEventListener("submit", function(event){
        event.preventDefault();
        const arrInput = document.getElementsByTagName("input");
        const name = arrInput[0].value;
        const location = arrInput[1].value;
        const phone = arrInput[2].value;

        sendTheatreReq(name, location, phone);
    })
}

async function sendTheatreReq(name, location, phone){
    try{
        const resp = await axios.post("/api/theatres/createtheatre",{name,location,phone});
        if(resp.data.succ){
            alert("Added theater");
            location.replace("/me");
        }
        else{
            alert("Something went wrong");
        }
    }catch(err){
        console.log(err);
    }
}

if(movie){
    movie.addEventListener("submit",function(event){
        event.preventDefault();
        const arrInput = document.getElementsByTagName("input");
        const name = arrInput[0].value;
        const time = arrInput[1].value;
        const theater = document.getElementById("theatrename").value;
        console.log(theater);

        sendMovieReq(name , time, theater);
    })
}

async function sendMovieReq(name,time,theatre){
    try{
        // let obj = theatre;
        // console.log(obj);
        // console.log(obj["_id"]);
        const resp = await axios.post(`/api/movies/addmovie/${theatre}`,{name,time});
        if(resp.data.succ){
            alert("movie added");
            location.replace("/me");
        }
        else{
            alert("something went wrong");
        }
    }catch(err){
        console.log(err);
    }
}

if(bookings){
    for(let i = 0; i < bookings.length; i++){
        bookings[i].addEventListener("click",function(event){
            event.preventDefault();
            const inputArr = document.getElementsByTagName("input");
            const seats = inputArr[i].value;
            const movieid = bookings[i].getAttribute("id");
            console.log(seats);
            sendBookingReq(seats,movieid);

        })
    }
}
async function sendBookingReq(seats,movieid){
    try{
        if(seats >= 1){
            const resp = await axios.post(`/api/bookings/${movieid}`,{seat:seats});
            if(resp.data.succ){
                let booking = resp.data.booking;
                alert(`Your booking is confirmed for ${seats} seats and your booking id is ${booking["_id"]}`);
            }
            else{
                alert("Something went wrong");
            }
        }
        else{
            alert("Provide proper seats")
        }
    }catch(err){
        console.log(err);
    }
}