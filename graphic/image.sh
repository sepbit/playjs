#!/usr/bin/env sh

#
# Favicon
#
convert -background none -resize 256x256 -colors 256 512.svg ../public/favicon.ico
# convert output-16x16.png output-32x32.png favicon.ico

convert -background none -resize 1200x630 1200x630.svg ../public/assets/images/1200x630.png

#
# PWA icon
#
convert -background none -resize 44x44 512.svg ../public/assets/images/44.png
convert -background none -resize 50x50 512.svg ../public/assets/images/50.png
convert -background none -resize 150x150 512.svg ../public/assets/images/150.png

convert -background none -resize 192x192 512.svg ../public/assets/images/192.png
convert -background none -resize 512x512 512.svg ../public/assets/images/512.png

convert -background none -resize 192x192 maskable-512.svg ../public/assets/images/maskable-192.png
convert -background none -resize 512x512 maskable-512.svg ../public/assets/images/maskable-512.png

