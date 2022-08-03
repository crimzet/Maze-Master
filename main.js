//Creating a canvas variable
const canvas = document.getElementById("canv");
canvas.width = 600;
canvas.height = 600;

//Drawing tool
const ctx = canvas.getContext("2d");

// Selectable variables
let speed = 50;
let width = 0;
let height = 0;

// Open toolbox on trigger
document.onclick = (e) => {
    if (e.target.matches(".btn"))
    {
        switch (document.getElementsByClassName("btn")[0] == e.target)
        {
            case true:
                e.target.classList.toggle("active");
                document.getElementsByClassName("content")[0].classList.toggle("active");
                document.getElementsByClassName("btn")[1].classList.remove("active");
                document.getElementsByClassName("content")[1].classList.remove("active");
                break;
            case false:
                e.target.classList.toggle("active");
                document.getElementsByClassName("content")[1].classList.toggle("active");
                document.getElementsByClassName("btn")[0].classList.remove("active");
                document.getElementsByClassName("content")[0].classList.remove("active");
                break;
            default:
                break;
        }
    }
    if (e.target.matches("#size-btn"))
    {
        width = parseInt(document.getElementById("width").value);
        height = parseInt(document.getElementById("height").value);
    }
    if (e.target.matches("#speed-btn"))
    {
        speed = parseInt(document.getElementById("speed").value);
        
        if (width != 0)
        {

            //Maze
            const maze = new Maze(width, height);

            let loop = setInterval(function() {
                try{
                    maze.run();
                    maze.display();
                    if (maze.finished) 
                    {
                        clearInterval(loop);
                        console.log("Finished")
                    }
                } catch (error)
                {
                    console.error(error);
                    clearInterval(loop);
                }
            }, speed);
        }

    }
    if (e.target.matches("#download-btn"))
    {
        let link = document.createElement("a");
        link.download = "maze.png";
        link.href = canvas.toDataURL();
        link.click();
        link.remove();
    }
}

