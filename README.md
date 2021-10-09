# on-social-media

Track your activity on social media


## Installation and usage


```bash
git clone https://github.com/HosseinDotLink/on-social-media.git

cd on-social-media

npm i

npm start
```

## How it works
Add your ids to config file in ```./confg/ids.json```

For profile details (for example on virgool)
```http
localhost:3000/api/virgool/
```
For activity details (for example on virgool)
```http
localhost:3000/api/virgool/activity
```
## Available routes
- Virgool
- - /     : get user detail
- - /activity    : get user activity
- Telegram
- - /     : get user detail

## Roadmap
- [x] virgool (scrape data)
- [x] telegram
- [ ] linkedin
- [ ] twitter
- [ ] medium
- [ ] facebook
- [ ] github

## License
[GNU](https://github.com/HosseinDotLink/on-social-media/blob/main/LICENSE)
