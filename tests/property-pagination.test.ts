import request from 'supertest';
import app from '../src/app';

describe('Property Pagination System', () => {
  describe('GET /api/v1/property', () => {
    it('should return paginated properties with default values', async () => {
      const response = await request(app)
        .get('/api/v1/property')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('pagination');
      expect(response.body.data.pagination).toHaveProperty('currentPage');
      expect(response.body.data.pagination).toHaveProperty('totalPages');
      expect(response.body.data.pagination).toHaveProperty('totalItems');
      expect(response.body.data.pagination).toHaveProperty('itemsPerPage');
      expect(response.body.data.pagination).toHaveProperty('hasNextPage');
      expect(response.body.data.pagination).toHaveProperty('hasPrevPage');
    });

    it('should handle pagination parameters correctly', async () => {
      const response = await request(app)
        .get('/api/v1/property?page=1&limit=5')
        .expect(200);

      expect(response.body.data.pagination.currentPage).toBe(1);
      expect(response.body.data.pagination.itemsPerPage).toBe(5);
    });

    it('should handle search filters correctly', async () => {
      const response = await request(app)
        .get('/api/v1/property?type=apartment&status=available&minPrice=100000&maxPrice=500000')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    it('should handle sorting parameters correctly', async () => {
      const response = await request(app)
        .get('/api/v1/property?sortBy=price&sortOrder=asc')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
    });

    it('should validate pagination limits (max 100)', async () => {
      const response = await request(app)
        .get('/api/v1/property?limit=150')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });

    it('should validate invalid property type', async () => {
      const response = await request(app)
        .get('/api/v1/property?type=invalid_type')
        .expect(400);

      expect(response.body).toHaveProperty('success', false);
    });
  });
});