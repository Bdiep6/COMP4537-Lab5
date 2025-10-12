/** 
 * @file lang/en/en.js
 * @author Yujin Jeong, Brian Diep
 * @version 1.0
 * @description This file contains all messages and labels in English.
*/

class MessageManager
{
    static MESSAGES = 
    {
        INSERT_SUCCESS: "Data inserted successfully!",
        QUERY_ERROR:    "Error executing query",
        NETWORK_ERROR:  "Network error occurred",
        INVALID_QUERY:  "Only SELECT and INSERT queries are allowed"
    };

    static LABELS =
    {
        PAGE_TITLE:          "Jeong SQL Client",
        TEXT_AREA_LABEL:     "Enter SQL Query",
        SUBMIT_BUTTON_LABEL: "Submit",
        INSERT_BUTTON_LABEL: "Seed Data (Insert)",
    };
    
}

export default MessageManager;