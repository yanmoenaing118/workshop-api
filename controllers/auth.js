const jwt = require("jsonwebtoken");
const User = require("./../models/user");

exports.register = async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETE, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        error: false,
        message: "Register success",
        data: {
            token,
            user: newUser
        }
    })
}

exports.login = async (req, res, next) => {
    console.log(req.body);

    // check if email and password are provided
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            error: true,
            message: "Incorrect email or password",
        });
    }
    // check if the user exists and correct password
    const user = await User.findOne({ email: req.body.email }).select(
        "+password"
    );

    console.log(user);

    // the user exists and password is correct
    if (!user || !(await user.correctPassword(req.body.password))) {
        return res.status(400).json({
            error: true,
            message: "Incorrect email or password",
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
        error: false,
        message: "Login succes",
        data: {
            token,
            user
        }
    })

}

exports.protect = async (req, res, next) => {
    // check if the authorization header is present
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    } else if (req.headers.cookie) {
        token = req.headers.cookie.split("=")[1];

    }

    if (!token) {
        return next(new AppError("You are not logged in. Please log in!", 401));
    }
    // verify the token with secrete key
    const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRETE_KEY
    );
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(
            new AppError("The user belonging to this token doesn't exist.", 404)
        );
    }

    // check if user changed password after the token has been issued
    if (user.changedPasswordAfter(decoded.iat)) {
        return next(
            new AppError(
                "This user has recently changed the password. Log in again to access",
                401
            )
        );
    }

    req.user = user;
    res.locals.user = user;

    next();
}