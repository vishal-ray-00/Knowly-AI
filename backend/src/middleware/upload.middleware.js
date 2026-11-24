import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        // Allow only PDF files
        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"));
        }
    },
});

export const uploadpdfFile = (req, res, next) => {
    upload.single("file")(req, res, (error)=> {
        if(!error) return next();

        const message = error.code === "LIMIT FILE SIZE" ? "File is too large (max 10 MB)"
        : error.message ;
        res.status(400).json({ success: false, message });
    })
}