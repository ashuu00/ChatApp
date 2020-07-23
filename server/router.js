const express=require('express');
const router=express.Router();
router.get('/', (req, res) => {
    res.send("Server u[ and running");
});
// router.post(('/socket.io', (req, res) => {
//     res.send("Server u[ and running");
// }));
module.exports=router;