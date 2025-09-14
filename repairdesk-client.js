const axios = require('axios');

class RepairDeskAPIClient {
  constructor(apiKey, baseUrl = 'https://api.repairdesk.co/api/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    // Add API key to all requests
    this.client.interceptors.request.use((config) => {
      config.params = { ...config.params, api_key: this.apiKey };
      return config;
    });
  }

  async request(method, endpoint, data = {}) {
    try {
      const response = await this.client.request({
        method,
        url: endpoint,
        data
      });

      // Handle different response formats
      if (response.data.data) {
        return response.data.data;
      } else if (response.data.items) {
        return response.data.items;
      } else {
        return response.data;
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`RepairDesk API Error: ${message}`);
    }
  }

  // Inventory methods
  async getInventory(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/inventory?${query}` : '/inventory';
    return this.request('GET', endpoint);
  }

  async addInventoryItem(itemData) {
    return this.request('POST', '/inventory', itemData);
  }

  async updateInventoryItem(itemId, itemData) {
    return this.request('PUT', `/inventory/${itemId}`, itemData);
  }

  // Customer methods
  async getCustomers(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/customers?${query}` : '/customers';
    return this.request('GET', endpoint);
  }

  async getCustomer(customerId) {
    return this.request('GET', `/customers/${customerId}`);
  }

  async updateCustomer(customerId, customerData) {
    return this.request('PUT', `/customers/${customerId}`, customerData);
  }

  // Repair ticket methods
  async createRepairTicket(ticketData) {
    return this.request('POST', '/repairs', ticketData);
  }

  async getRepairTickets(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/repairs?${query}` : '/repairs';
    return this.request('GET', endpoint);
  }

  async updateRepairTicket(ticketId, ticketData) {
    return this.request('PUT', `/repairs/${ticketId}`, ticketData);
  }

  // Order methods
  async getOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/orders?${query}` : '/orders';
    return this.request('GET', endpoint);
  }

  async getOrder(orderId) {
    return this.request('GET', `/orders/${orderId}`);
  }

  // Ticket methods (for support)
  async createTicket(ticketData) {
    return this.request('POST', '/tickets', ticketData);
  }

  async updateTicketStatus(ticketId, statusData) {
    return this.request('PUT', `/ticket/updateticketstatus/${ticketId}`, statusData);
  }

  async getStatuses() {
    return this.request('GET', '/statuses');
  }

  // Purchase orders
  async getPurchaseOrders(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/purchase-orders?${query}` : '/purchase-orders';
    return this.request('GET', endpoint);
  }

  // Test connection
  async testConnection() {
    try {
      await this.request('GET', '/repairs?page=1&pagesize=1');
      return true;
    } catch (error) {
      throw new Error(`Connection test failed: ${error.message}`);
    }
  }
}

module.exports = new RepairDeskAPIClient(process.env.REPAIRDESK_API_KEY);
