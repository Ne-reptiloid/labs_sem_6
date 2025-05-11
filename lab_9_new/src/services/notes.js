import axios from "axios";

export const fetchNotes = async () => {
    try {
        var response = await axios.get("https://localhost:7045/notes");

        return response.data.notes;
    }   catch (e) {
        console.error(e);
    }
    
};
