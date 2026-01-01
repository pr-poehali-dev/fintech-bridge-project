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
                       line1, line2, line3,
                       background_image as "backgroundImage", logo_svg as "logoSvg",
                       accepts_visa as "acceptsVisa", accepts_mastercard as "acceptsMastercard",
                       accepts_apple_pay as "acceptsApplePay", accepts_google_pay as "acceptsGooglePay",
                       card_reissue as "cardReissue", high_payment_approval as "highPaymentApproval",
                       crypto_support as "cryptoSupport", sepa_iban as "sepaIban",
                       ach_usd as "achUsd", swift, supported_currencies as "supportedCurrencies",
                       billing_regions as "billingRegions", priority
                FROM services
                ORDER BY priority DESC, created_at DESC
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
                    line1, line2, line3,
                    background_image, logo_svg, accepts_visa, accepts_mastercard,
                    accepts_apple_pay, accepts_google_pay, card_reissue, high_payment_approval,
                    crypto_support, sepa_iban, ach_usd, swift, supported_currencies,
                    billing_regions, priority
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            ''', (
                data['id'], data['name'], data['type'], data['category'],
                data['icon'], data['description'], data['price'], data['cta'],
                data.get('line1'), data.get('line2'), data.get('line3'),
                data.get('backgroundImage'), data.get('logoSvg'),
                data.get('acceptsVisa', False), data.get('acceptsMastercard', False),
                data.get('acceptsApplePay', False), data.get('acceptsGooglePay', False),
                data.get('cardReissue', False), data.get('highPaymentApproval', False),
                data.get('cryptoSupport', False), data.get('sepaIban', False),
                data.get('achUsd', False), data.get('swift', False),
                data.get('supportedCurrencies', []), data.get('billingRegions', []),
                data.get('priority', 0)
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
                    line1 = %s, line2 = %s, line3 = %s,
                    background_image = %s, logo_svg = %s,
                    accepts_visa = %s, accepts_mastercard = %s,
                    accepts_apple_pay = %s, accepts_google_pay = %s,
                    card_reissue = %s, high_payment_approval = %s,
                    crypto_support = %s, sepa_iban = %s,
                    ach_usd = %s, swift = %s,
                    supported_currencies = %s, billing_regions = %s,
                    priority = %s,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            ''', (
                data['name'], data['type'], data['category'], data['icon'],
                data['description'], data['price'], data['cta'],
                data.get('line1'), data.get('line2'), data.get('line3'),
                data.get('backgroundImage'), data.get('logoSvg'),
                data.get('acceptsVisa', False), data.get('acceptsMastercard', False),
                data.get('acceptsApplePay', False), data.get('acceptsGooglePay', False),
                data.get('cardReissue', False), data.get('highPaymentApproval', False),
                data.get('cryptoSupport', False), data.get('sepaIban', False),
                data.get('achUsd', False), data.get('swift', False),
                data.get('supportedCurrencies', []), data.get('billingRegions', []),
                data.get('priority', 0),
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