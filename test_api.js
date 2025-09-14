const repairdeskClient = require('./repairdesk-client');

async function testAPI() {
  try {
    console.log('Testing RepairDesk API connection...');
    const connected = await repairdeskClient.testConnection();
    console.log('Connection test:', connected);

    if (connected) {
      console.log('Fetching statuses...');
      const statuses = await repairdeskClient.getStatuses();
      console.log('Statuses:', statuses);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAPI();
