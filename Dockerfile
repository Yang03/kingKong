FROM node:9-alpine

RUN apk --update add tzdata \
&& cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& echo "Asia/Shanghai" > /etc/timezone \
&& apk del tzdata

RUN mkdir -p /usr/project/

WORKDIR /usr/project/

COPY package.json /usr/project/package.json

RUN npm i --registry=https://registry.npm.taobao.org

COPY . /usr/project

EXPOSE 7001

CMD npm run dev
