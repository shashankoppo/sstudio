const API_URL = '/api';

let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

export const api = {
  auth: {
    signUp: async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthToken(data.sessionToken);
      return data;
    },

    signIn: async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setAuthToken(data.sessionToken);
      return data;
    },

    signOut: async () => {
      const res = await fetch(`${API_URL}/auth/signout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ sessionToken: authToken }),
      });
      if (!res.ok) throw new Error('Sign out failed');
      setAuthToken(null);
    },

    getSession: async () => {
      if (!authToken) return null;
      const res = await fetch(`${API_URL}/auth/session`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (!res.ok) {
        setAuthToken(null);
        return null;
      }
      return authToken;
    },
  },

  leads: {
    list: async () => {
      const res = await fetch(`${API_URL}/leads`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },

    create: async (lead: any) => {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(lead),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },

    update: async (id: string, updates: any) => {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },

    delete: async (id: string) => {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error('Delete failed');
    },
  },

  portfolio: {
    categories: {
      list: async () => {
        const res = await fetch(`${API_URL}/portfolio/categories`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      },

      create: async (name: string) => {
        const res = await fetch(`${API_URL}/portfolio/categories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ name }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      },

      delete: async (id: string) => {
        const res = await fetch(`${API_URL}/portfolio/categories/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        if (!res.ok) throw new Error('Delete failed');
      },
    },

    items: {
      list: async () => {
        const res = await fetch(`${API_URL}/portfolio/items`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      },

      create: async (item: any) => {
        const res = await fetch(`${API_URL}/portfolio/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(item),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      },

      update: async (id: string, updates: any) => {
        const res = await fetch(`${API_URL}/portfolio/items/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify(updates),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      },

      delete: async (id: string) => {
        const res = await fetch(`${API_URL}/portfolio/items/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${authToken}` },
        });
        if (!res.ok) throw new Error('Delete failed');
      },
    },
  },

  testimonials: {
    list: async () => {
      const res = await fetch(`${API_URL}/testimonials`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },

    create: async (testimonial: any) => {
      const res = await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(testimonial),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },

    update: async (id: string, updates: any) => {
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      return data;
    },

    delete: async (id: string) => {
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error('Delete failed');
    },
  },
};
