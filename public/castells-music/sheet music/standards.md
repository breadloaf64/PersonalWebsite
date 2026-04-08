Sheet music sto be exported as PDF as

- music with solfege
- music with solfege and space between staves (so that finger diagrams can be added)
- music with solfege and finger diagrams (use my Gralla Fingers tool on github)

Sheet music should also be exported as SVG for showing directly to the webpage

# Stave spacing in musescore

To change space between staves in Musescore, go to Format/style.../spacing

## Normal space between staves:

- Factor for distance between staves: 2.5
- Min system distance 0.0sp
- Max system distance 10.0sp

## Extra space between staves (for diagrams):

- Factor for distance between staves: 2.5
- Min system distance 8.5sp
- Max system distance 32.0sp

If this doesn't work, then try

- Select "Disable vertical justification of staves"
- Min and Max system distance to 20sp

# Cropping the SVG

If you export an SVG from musescore it will come with all the whitespace at the bottom of the A4 page musescore works in. To make it fit better on the webpage do this:

- Open the svg in vscode (or a text editor of your choice)
- Regard the top level `<svg>` element
- Remove the width and height properties
- modify the 2nd and 4th elements of the viewbox property to perform the crop.
  - Crop first from the top by increasing the 2nd element. 200 is usually a good value.
  - Crop then from the bottom by decreasing the 4th element. This will need some trial and error.
