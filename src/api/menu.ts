// src/app/api/menu/menu.ts
import { MenuItem } from '@/types/menu';

export async function getMenuData(): Promise<MenuItem[]> {
  try {
    const response = await fetch('/api/menu', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Server response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`Failed to fetch menu items: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched menu data:', data);
    return data;
  } catch (error) {
    console.error('Detailed fetch error:', error);
    throw error;
  }
}