export const getAllNotes = (req, res) => {
    return res.json("all notes");
}
export const getRecommendedNotes = (req, res) => {
    return res.json("recommended");
}
export const getSingleNote = (req, res) => {
    return res.json("single note");
}
export const getDownlodedNotes = (req, res) => {
    return res.json("downloaded");
}
export const getUploadedNotes = (req, res) => {
    return res.json("uploaded");
}
export const uploadNote = (req, res) => {
    return res.json("create new note");
}
export const updateExistingNote = (req, res) => {
    return res.json("update note");
}
export const deleteSelectedNote = (req, res) => {
    return res.json("delete note");
}