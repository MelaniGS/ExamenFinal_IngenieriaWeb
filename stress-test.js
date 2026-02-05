import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 }, // subida a 20 usuarios
        { duration: '1m', target: 20 },  // mantener 20 usuarios
        { duration: '30s', target: 0 },  // bajada a 0
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% de las solicitudes < 500ms
    },
};

export default function () {
    const url = 'http://localhost:3000/api/libros';
    const params = {
        headers: {
            'x-api-key': 'examen-seguro-2026',
        },
    };
    const res = http.get(url, params);

    check(res, {
        'status is 200': (r) => r.status === 200,
        'latency is okay': (r) => r.timings.duration < 1000,
    });

    sleep(1);
}
