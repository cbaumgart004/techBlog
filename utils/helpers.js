console.log('Loading helpers...') // This will help identify if the file is being loaded

const { format } = require('date-fns') // Ensure this package is installed
console.log('Date-fns loaded...') // Check if date-fns is loaded correctly

module.exports = {
  formatDate: (date) => {
    return format(new Date(date), 'MMMM dd, yyyy') // Adjust format as needed
  },
}
