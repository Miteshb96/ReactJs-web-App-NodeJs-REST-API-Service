const {
    Thread
} = require("../models");


class Thread_controller {
    constructor() {
        this.getThread = this.getThread.bind(this);
        this.addThread = this.addThread.bind(this);
    }

    //Display Thread list
    async getThread(req, res) {
        console.log("fetching thread list");
        try {
            const temp = await Thread.find().lean();
            temp.status_code = 200;
            return res.send(temp);
        } catch (error) {
            console.log(error);
        }
    }

    //Add new thread
    addThread(req, res) {
        try {
            const {
                title,
                description,
                tags,
                username: userName,
                date
            } = req.body


            const newThread = new Thread({
                title,
                description,
                tags,
                userName,
                date
            });

            newThread.save((err, data) => {
                if (err) throw err;
                const response = {
                    "message": "new thread is added successfully."
                }
                response.status_code = 200
                res.json(response);
            });
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = new Thread_controller()