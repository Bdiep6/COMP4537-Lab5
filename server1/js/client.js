/** 
 * @file js/client.js
 * @author Yujin Jeong, Brian Diep, ChatGPT
 * @version 1.0
 * @description This file contains the client-side JavaScript code for handling user interactions,
 *              sending SQL queries to the backend server, and displaying responses.
 *              It supports both GET and POST requests based on the type of SQL query.
 *              Only SELECT and INSERT queries are allowed.
*/

import MessageManager   from "../lang/en/en.js";
import { BACKEND_URL }  from "./constants.js";

class Client 
{
    /**
     * Initialize the client with backend URL, elements and set up event listeners
     * @param {*} backendUrl 
     */
    constructor(backendUrl)
    {

        this.BACKEND_URL                = backendUrl;
        
        this.PAGE_TITLE                 = document.getElementById('page-title');
        this.INSERT_BUTTON              = document.getElementById('insert-button');
        this.SUBMIT_BUTTON              = document.getElementById('submit-button');
        this.TEXT_AREA                  = document.getElementById('text-area');
        this.RESPONSE_AREA              = document.getElementById('response');

        this.PAGE_TITLE.textContent     = MessageManager.LABELS.PAGE_TITLE;
        this.SUBMIT_BUTTON.textContent  = MessageManager.LABELS.SUBMIT_BUTTON_LABEL;
        this.INSERT_BUTTON.textContent  = MessageManager.LABELS.INSERT_BUTTON_LABEL;

        document.querySelector('label[for="text-area"]').textContent = MessageManager.LABELS.TEXT_AREA_LABEL;

        this.initializeEventListeners();
    }

    /**
     * Initialize event listeners for buttons
     */
    initializeEventListeners()
    {
        this.INSERT_BUTTON.addEventListener('click', () => this.handleInsert());
        this.SUBMIT_BUTTON.addEventListener('click', () => this.handleSubmit());
    }

    /**
     * Handle submit button click
     * Sends either a GET or POST request to the server based on the SQL query type
     * (SELECT = GET, INSERT = POST)
     * Only SELECT and INSERT queries are allowed.
     */
    async handleSubmit()
    {   
        // Get the text (value) from the text-area id and trim whitespace
        const query = this.TEXT_AREA.value.trim();
        
        // Validate the query 
        if (!this.isValidQuery(query))
        {
            // If false: display invalid query message and return
            this.displayResponse(MessageManager.MESSAGES.INVALID_QUERY);
            return;
        }

        try
        {
            // Grabs the query, converts to uppercase and checks if it starts with SELECT
            const isSelectQuery = query.toUpperCase().startsWith('SELECT');

            let url;
            let requestOptions;

            // If isSelectQuery is true: use GET request (SELECT = GET)
            if (isSelectQuery === true)
            {
                // Build the url for GET request
                url = `${this.BACKEND_URL}/sql/${encodeURIComponent(query)}`;
                
                // Set request options for GET
                requestOptions = 
                {
                    method: 'GET'
                };
            }
            // If false: use POST request
            else 
            {
                // Build the url for POST request
                url = `${this.BACKEND_URL}/sql`;

                // Set request options for POST
                requestOptions = 
                {
                    method:     'POST',
                    headers:    { 'Content-Type': 'application/json' },
                    body:       JSON.stringify({ query })
                };
            }

            const response  = await fetch(url, requestOptions);
            const data      = await response.json();

            this.displayResponse(JSON.stringify(data, null, 2));
        }
        catch (error)
        {
            this.displayResponse(MessageManager.MESSAGES.QUERY_ERROR);
        }

    }

    /**
     * Check if the SQL query is either a SELECT (read) or INSERT (write),
     * because only those two types of queries are allowed.
     * 
     * Returns true if valid (SELECT or INSERT), otherwise false.
     * @param {string} query 
     * @returns {boolean}
     */
    isValidQuery(query)
    {
        const upperCasedQuery = query.toUpperCase().trim();

        if (!upperCasedQuery.startsWith('SELECT') && !upperCasedQuery.startsWith('INSERT')) 
            {
                return false;
            }
            return true;
    }

    /**
     * Display response message in the response area
     * @param {string} message 
     */
    displayResponse(message)
    {
        this.RESPONSE_AREA.textContent = message;
    }
    
    /**
     * Handle insert button click
     */
    async handleInsert()
    {
        await fetch(`${this.BACKEND_URL}/insert-dummy`, 
            {  
                method: 'POST'
            });
    }

    

}

document.addEventListener('DOMContentLoaded', () =>
{
    new Client(BACKEND_URL);
});