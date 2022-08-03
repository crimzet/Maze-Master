class Maze
{
    constructor(columns, rows)
    {

        this.columns = columns;
        this.rows = rows;
        this.tileW = canvas.width / this.columns;
        this.tileH = canvas.height / this.rows;

        this.finished = false;
        this.string = [];
        this.path = [];
        this.checkedCells = [];

        this.symbols = ["#", "S", "F", " "];
        this.colors = ["black", "green", "red", "white"];

        this.init();
        this.addNodes();
    }
    checkCell(y, x)
    {

        // Check whether neighbouring cells are cleared
        let empty = [];
        if (y > 0 && y < this.string.length - 1 && x > 0 && x < this.string[0].length - 1)
        {
            if (this.string[y - 1][x] != "#") {
                empty.push([y - 1, x]);
                if (this.string[y + 1][x + 1] != "#") empty.push([y + 1, x + 1]);
                if (this.string[y + 1][x - 1] != "#") empty.push([y + 1, x - 1]);
            }
            if (this.string[y + 1][x] != "#" && this.string[y + 1][x] != "F") {
                empty.push([y + 1, x]);
                if (this.string[y - 1][x + 1] != "#" && this.string[y - 1][x + 1] != "F") empty.push([y - 1, x + 1]);
                if (this.string[y - 1][x - 1] != "#" && this.string[y - 1][x - 1] != "F") empty.push([y - 1, x - 1]);
            }
            if (this.string[y][x - 1] != "#") {
                empty.push([y, x - 1]);
                if (this.string[y + 1][x + 1] != "#") empty.push([y + 1, x + 1]);
                if (this.string[y - 1][x + 1] != "#") empty.push([y - 1, x + 1]);
            }
            if (this.string[y][x + 1] != "#") {
                empty.push([y, x + 1]);
                if (this.string[y + 1][x - 1] != "#") empty.push([y + 1, x - 1]);
                if (this.string[y - 1][x - 1] != "#") empty.push([y - 1, x - 1]);
            }
        } else empty.push([y, x]);

        if (empty.length < 2 && this.arraysMatch(empty[0], this.pos) && this.string[y][x] == "#") return true;
        else return false;
    }
    arraysMatch(a, b)
    {
        for (let index = 0; index < a.length; index++) {
            if (a[index] != b[index]) return false;
        }
        return true;
    }
    clear(y, x)
    {
        if (this.checkCell(this.pos[0] + y, this.pos[1] + x))
        {
            this.path.push([this.pos[0], this.pos[1]]);

            this.string[this.pos[0]][this.pos[1]] = " ";
            this.pos[0] += y;
            this.pos[1] += x;
            this.string[this.pos[0]][this.pos[1]] = "S";

            return true;
        } else return false;
    }
    randomChoice(array)
    {
        let choice = Math.floor(Math.random() * array.length);
        return array[choice];
    }
    init()
    {
        for (let y = 0; y < this.rows; y++) {

            this.string.push(["#"]);

            for (let x = 1; x < this.columns; x++) {
                this.string[y].push("#");
            }
        }
    }
    addNodes()
    {
        this.string[0][Math.floor(Math.random() * (this.columns - 2)) + 1] = "S";
        this.string[this.string.length - 1][Math.floor(Math.random() * (this.columns - 2)) + 1] = "F";

        this.pos = [0, this.string[0].indexOf("S")];
    }
    run()
    {
        if (this.x == undefined)
        {

            this.y = 1;
            this.x = 0;
            this.clear(1, 0);
            //this.string[this.string.length - 2][this.string[this.string.length - 1].indexOf("F")] = " ";
        }
        if (!this.finished)
        {
            // Reset the allowed moves
            this.alY = [1, -1, 0];
            this.alX = [1, -1, 0];
            
            // Remove the move, nagative to the previous one => not going to the cleared cell
            this.alY.splice(this.alY.indexOf(this.y != 0 ? -this.y : 0), 1);
            this.y = this.randomChoice(this.alY);

            // Set x either to move or to stay - depending on y
            if (this.y == 0)
            {
                this.alX.pop();
                if (this.x != 0) this.alX.splice(this.alX.indexOf(-this.x));

                this.x = this.randomChoice(this.alX);
            } else this.x = 0;
            
            // Check if all the neighbouring cells were checked
            if (!this.clear(this.y, this.x))
            {
                let cell = [this.y, this.x];
                if (!this.checkedCells.includes(cell.toString())) this.checkedCells.push(cell.toString());

                // If all have been checked, go to the previous cell and look for unchecked cells
                if (this.path.length == 1) this.finished = true;
                if (this.checkedCells.length > 3 && this.path.length > 1)
                {
                    this.string[this.pos[0]][this.pos[1]] = " ";

                    this.path.pop();
                    this.pos[0] = this.path[this.path.length - 1][0];
                    this.pos[1] = this.path[this.path.length - 1][1];

                    
                    this.string[this.pos[0]][this.pos[1]] = "S";
                    this.checkedCells = [];
                }
            } else if (this.clear(this.y, this.x)) this.checkedCells = [];
        }
    }
    display()
    {
        canvas.width = 600;
        for (let y = 0; y < this.rows; y++) {

            for (let x = 0; x < this.columns; x++) {
            
                let index = this.symbols.indexOf(this.string[y][x]);

                if (index >= 0)
                {
                    ctx.beginPath();
                    ctx.fillStyle = this.colors[index];
                    ctx.rect(x * this.tileW, y * this.tileH, this.tileW, this.tileH);
                    ctx.fill();
                }
            }
        }
    }
}
