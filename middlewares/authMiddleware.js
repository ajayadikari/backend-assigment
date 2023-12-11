import jwt from 'jsonwebtoken'

const isUserLoggedIn = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        let token = ''
        if (authHeader.charAt(0) == 'B') token = authHeader.split('Bearer ')[1];
        else token = authHeader

        if (!token || token == '') {
            res.status(500).json({
                success: false,
                message: 'error while checking token'
            })
        }
        const user = await jwt.verify(token, process.env.SECRET);
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'error while checking token'
        })
    }
}


const isSeller = (req, res, next) =>{
    try {
        if(req.user.isSeller){
            next();
        }
        else {
            res.status(400).json({
                success: false, 
                message: "only sellers are allowed"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false, 
            message: "only sellers are allowed", 
            error
        })
    }
}


export {isUserLoggedIn, isSeller}