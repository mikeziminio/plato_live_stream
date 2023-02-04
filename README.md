# Платон Видео Поток

## Технологический стек

### Backend:
- Node.js
- [ws](https://www.npmjs.com/package/ws) - организация signalling channel для WebRTC на WebSockets (сервер)
- ffmpeg - для склейки налету двух видео и двух аудио потоков и трансляцию его как 

### Frontend:
- [WebRTC](https://webrtc.org/) - для организации конференции
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) - организация signalling channel для WebRTC на WebSockets (клиент)
- [esbuild]() для быстрой и удобной сборки

### DevOps:
- docker
- nginx для раздачи статики на фронтенде

На бекенде и фронтенде код сознательно написан на чистом JavaScript без дополнительных фреймворков и библиотек.

## Зачем нужен Платон?

### Проект показывает возможности:

- Работы с WebRTC - как p2p, так и клиент-сервер.
- Склейки аудио-видео потоков и .

## Как раздаётся видео в проекте

Для раздачи видео во вне используются протоколы HLS и DASH

Объективный обзор протоколов:

https://www.youtube.com/watch?v=jYYhwbF3tvM

https://www.digitalocean.com/community/tutorials/how-to-set-up-a-video-streaming-server-using-nginx-rtmp-on-ubuntu-20-04