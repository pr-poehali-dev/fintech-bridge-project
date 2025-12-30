import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    """Получаем подключение к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """API для управления сервисами (CRUD операции)"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    try:
        conn = get_db_connection()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        
        if method == 'GET':
            cur.execute('''
                SELECT id, name, type, category, icon, description, price, cta,
                       background_image as "backgroundImage", logo_svg as "logoSvg",
                       accepts_visa as "acceptsVisa", accepts_mastercard as "acceptsMastercard"
                FROM services
                ORDER BY created_at DESC
            ''')
            services = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(s) for s in services])
            }
        
        elif method == 'POST':
            data = json.loads(event.get('body', '{}'))
            
            cur.execute('''
                INSERT INTO services (
                    id, name, type, category, icon, description, price, cta,
                    background_image, logo_svg, accepts_visa, accepts_mastercard
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (
                data['id'], data['name'], data['type'], data['category'],
                data['icon'], data['description'], data['price'], data['cta'],
                data.get('backgroundImage'), data.get('logoSvg'),
                data.get('acceptsVisa', False), data.get('acceptsMastercard', False)
            ))
            
            conn.commit()
            service_id = cur.fetchone()['id']
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': service_id, 'message': 'Service created'})
            }
        
        elif method == 'PUT':
            data = json.loads(event.get('body', '{}'))
            
            cur.execute('''
                UPDATE services SET
                    name = %s, type = %s, category = %s, icon = %s,
                    description = %s, price = %s, cta = %s,
                    background_image = %s, logo_svg = %s,
                    accepts_visa = %s, accepts_mastercard = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            ''', (
                data['name'], data['type'], data['category'], data['icon'],
                data['description'], data['price'], data['cta'],
                data.get('backgroundImage'), data.get('logoSvg'),
                data.get('acceptsVisa', False), data.get('acceptsMastercard', False),
                data['id']
            ))
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Service updated'})
            }
        
        elif method == 'DELETE':
            params = event.get('queryStringParameters', {})
            service_id = params.get('id')
            
            cur.execute('DELETE FROM services WHERE id = %s', (service_id,))
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'message': 'Service deleted'})
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'})
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()
