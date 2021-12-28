## Problem description [ENG]

When using Gologin programmatically with `puppeteer-core`

* cookies will be saved to back to the cloud service
* profile will be uploaded, but not reused in the desktop application

How to reproduce:

* run a profile in Gologin desktop app, note the tabs that are open in the session (or maybe there will be no tabs)
* stop this profile
* clone this repo and `yarn install`
* copy `.env.sample` to `.env` and fill in `GOLOGIN_TOKEN` and some `GOLOGIN_PROFILE_ID`
* `yarn start`
* the script will launch the session with the tabs from desktop app using `--restore-last-session` switch which is used in the desktop app itself
* there will be all previously opened tabs, which is correct
* the script will open a new tab with `example.com` website
* the script will close the browser and commit profile back to the cloud
* run the same profile in desktop app
* notice that there is no `example.com` tab among open tabs
* press CTRL+H to check history, there will be no `example.com` in recent history

This means that either profile is not uploaded back to the Gologin service OR thet it's uploaded but not reused in desktop app, thus breaking the utility and usefulness of Gologin service for combined manual and automated browser usage.

## Описание проблемы [RU]

В случае программного использования Gologin с `puppeteer-core`

* куки сохраняются в облако
* профиль загружается на сервер, но, похоже, повторно не используется ни скриптом, ни десктопной программой

Как проверить:

* запустить Gologin на компьютере, обратить внимание какие страницы открыты (или ничего не открыто)
* закрыть профиль
* склонировать этот репозиторий и `yarn install`
* переименовать `.env.sample` в `.env`, заполнить параметры `GOLOGIN_TOKEN`, `GOLOGIN_PROFILE_ID`
* `yarn start`
* скрипт запустит последнюю сессию из декстопного приложения, используя ключ `--restore-last-session`, который применяется и в самой программе
* все открытые страницы будут видны, это нам и надо
* скрипт откроет новую страницу с сайтом `example.com`
* скрипт закроет Орбиту и запросит сохранение профиля в облако, модуль `gologin` рапортует об успешной загрузке архива
* запустить этот профиль в приложении заново
* среди открытых влкадок не будет `example.com`, а должен был бы быть, ведь профиль загружен в облако

Следовательно, профиль или не загружен обратно в Gologin, или не помещен обратно в хранилище профилей.