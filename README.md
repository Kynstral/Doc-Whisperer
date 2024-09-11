## Doc Whisperer: Effortless Code Documentation

![app](https://github.com/user-attachments/assets/b32ed3f2-e256-472b-a6f4-9897aded79f3)

Doc Whisperer is a web application that leverages the power of Google Gemini to automatically generate various types of code documentation for you. Whether you need inline comments, block documentation, API usage examples, or even a full README file, Doc Whisperer can handle it.

**Live Demo:** https://doc-whisperer.vercel.app/

### Features:

- **Multiple Documentation Types:** Generate different types of documentation including:
    - Inline Comments
    - Block Comments
    - Docstrings
    - API Reference Documentation
    - API User Guides
    - README Files
- **Intuitive Chat Interface:** Interact with the AI through a familiar chat-like experience.
- **Code Highlighting:** Enjoy syntax-highlighted code blocks for better readability.
- **Code Editing and Regeneration:** Easily edit your code and regenerate the corresponding documentation.
- **Message History:** View and manage past conversations in your chat history.
- **Chat Export/Copy:** Download your entire chat history as a JSON file or copy its content to your clipboard.
- **Code Comparison:** Directly compare the original code with the generated documentation.
- **Mobile-Friendly & Responsive Design:**  Seamlessly use Doc Whisperer on different screen sizes and devices.

### How It Works:

1. **Input Your Code:** Paste or write your code snippet directly into the chat input area.
2. **Select Documentation Type:** Choose the type of documentation you need from the dropdown menu.
3. **Send and Generate:**  Click the send button or press Enter to submit your code to the AI.
4. **Review and Edit:** Analyze the generated documentation.  You can directly edit the output if needed.
5. **Regenerate (Optional):**  If you edited your original code or want to explore different variations of the documentation, click the "regenerate" button to trigger a fresh response.

## Why Use Doc Whisperer?

Doc Whisperer offers several compelling benefits for developers and technical writers:

* **Save Time and Effort:**  Generating documentation manually is time-consuming and tedious.  Doc Whisperer automates this process, allowing you to focus on writing code, not documentation.
* **Improve Code Quality:** Clear, concise documentation improves code readability and maintainability. By making it easier to document code, Doc Whisperer indirectly enhances your code's overall quality.
* **Reduce Errors:** Manual documentation can introduce inaccuracies. AI-generated documentation is less prone to these errors, ensuring consistency and clarity.
* **Boost Productivity:** Eliminate documentation bottlenecks and deliver projects faster with the help of Doc Whisperer's automation.
* **Enhance Collaboration:** Well-documented code makes it easier for teams to collaborate, understand projects, and onboard new members effectively.
* **Stay Up-to-Date:** When code changes, regenerating documentation becomes effortless, ensuring your documentation is always current.

Whether you're a solo developer or part of a large team, Doc Whisperer empowers you to produce high-quality code documentation quickly and easily.


### Get Started:
 
Doc Whisperer is built using Next.js 14. When ready,  the installation process will be as follows:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Kynstral/doc-whisperer.git
   ``` 

2. **Install Dependencies:**
   ```bash
   cd doc-whisperer
   npm install 
   ``` 

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory of the project and add your Google Gemini API Key:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
   ``` 

4. **Start the Development Server:**
   ```bash
   npx next dev 
   ```

### Disclaimer:

While Doc Whisperer strives to generate accurate and helpful documentation, please be aware that AI-generated content should always be reviewed carefully.  
