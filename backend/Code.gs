function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming JSON payload
    var data = JSON.parse(e.postData.contents);
    var responses = data.responses || {};
    
    // Phase 8: Data Quality Improvements (Backend Sanitization)
    function sanitize(val) {
      // Prevent null or undefined values
      if (val === null || val === undefined) return "";
      
      // Phase 4: Array & Multi-select handling
      // Convert arrays into readable comma-separated strings
      if (Array.isArray(val)) {
        return val.map(function(item) {
          return String(item).trim();
        }).join(", ");
      }
      
      // Phase 5: Boolean-text question handling
      // Safely parse objects with 'choice' and 'text' properties
      if (typeof val === 'object') {
        var parts = [];
        if (val.choice) parts.push(String(val.choice).trim());
        if (val.text) parts.push(String(val.text).trim());
        
        if (parts.length > 0) {
          return parts.join(" — ");
        }
        
        // Fallback for unexpected objects
        return JSON.stringify(val);
      }
      
      // Trim whitespace for standard strings
      return String(val).trim();
    }
    
    // Phase 1, 2 & 3: Standardize Question IDs and Google Sheets Alignment
    var row = [
      data.timestamp || new Date().toISOString(),
      sanitize(data.firstName),
      sanitize(data.email),
      sanitize(data.language),
      
      // Map every question response individually and predictably
      sanitize(responses.q1),
      sanitize(responses.q2),
      sanitize(responses.q3),
      sanitize(responses.q4),
      sanitize(responses.q5),
      sanitize(responses.q6),
      sanitize(responses.q7),
      sanitize(responses.q8),
      sanitize(responses.q9),
      sanitize(responses.q10),
      sanitize(responses.q11),
      sanitize(responses.q12),
      sanitize(responses.q13),
      sanitize(responses.q14),
      sanitize(responses.q15),
      
      // Include the final reflection text
      sanitize(responses.final_reflection)
    ];
    
    // Phase 9: Error Resilience (prevent malformed row insertion crashes)
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Graceful error handling
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
