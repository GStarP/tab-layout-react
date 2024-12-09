# Tab Layout

## Using Libs

This component is for "copy-and-paste" usage, so you have to rely on the following libs:

- react 18
- react-router v6
- tailwindcss
- immer
- keepalive-for-react
- ahooks
- tailwind-merge

## Design

location.pathname <=> tab

current pathname determines which tab is active.

current pathname determines which component is shown (that is what react-router is doing)

change tab just means change pathname (of course, with some adjustment to tabs' state)

## Features

- activate tab: create/focus tab
- close tab
- can auto create tab when refresh
- can cache component
