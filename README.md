# PlantUML Live Editor

Edit, preview and share plantuml charts/diagrams.

based on [mermaid-live-editor](https://github.com/mermaid-js/mermaid-live-editor)

## Features

- Edit and preview flowcharts, sequence diagrams, gantt diagrams in real time.
- Save the result as a svg
- Get a link to a viewer of the diagram so that you can share it with others.
- Get a link to edit the diagram so that someone else can tweak it and send a new link back


## Tools

### GDB Backtrace Plot

Generate plantuml code from output of gdb `bt` command.

The following input

``` c
#0  run_mod (mod=0x9866b0, filename=filename@entry=0x7ffff6fc5820, globals=globals@entry=0x7ffff6ff8328,
    locals=locals@entry=0x7ffff6ff8328, flags=flags@entry=0x7fffffffde80, arena=arena@entry=0x7ffff6f64400)
    at Python/pythonrun.c:1029
#1  0x000000000052672b in PyRun_StringFlags (str=str@entry=0x7ffff6fe5330 "1+1\n", start=start@entry=257,
    globals=0x7ffff6ff8328, locals=0x7ffff6ff8328, flags=flags@entry=0x7fffffffde80) at Python/pythonrun.c:959
#2  0x0000000000526796 in PyRun_SimpleStringFlags (command=0x7ffff6fe5330 "1+1\n", flags=flags@entry=0x7fffffffde80)
    at Python/pythonrun.c:455
#3  0x00000000004215d1 in pymain_run_command (command=<optimized out>, cf=cf@entry=0x7fffffffde80)
    at Modules/main.c:383
#4  0x0000000000422091 in pymain_run_python (pymain=pymain@entry=0x7fffffffdef0) at Modules/main.c:2514
#5  0x0000000000423644 in pymain_main (pymain=pymain@entry=0x7fffffffdef0) at Modules/main.c:2662
#6  0x0000000000423789 in _Py_UnixMain (argc=<optimized out>, argv=<optimized out>) at Modules/main.c:2697
#7  0x000000000041ee5f in main (argc=<optimized out>, argv=<optimized out>) at ./Programs/python.c:15
```

will generate:

```
@startuml
	 (*) --> "main"
	 --> "_Py_UnixMain"
	 --> "pymain_main"
	 --> "pymain_run_python"
	 --> "pymain_run_command"
	 --> "PyRun_SimpleStringFlags"
	 --> "PyRun_StringFlags"
	 --> "run_mod"
@enduml
```

[![](http://www.plantuml.com/plantuml/png/SoWkIImgAStDuU9KqD3ILD3LjLDGoatCp5C22e0vyG6LyQ5vcHM-o885bI0ryRbOn8fAy-8BAaioyh7A9EVdvYRcfS2b0Yg3WAB1cRa5EQd19KMPUUbkEOdfnUZoM6H0fkNc0qroICrB0Ne00000)](https://www.panjianning.com/puml/edit/#pako:eNp1j8GqwkAMRX-lZOUT_YEuxMXTnSAWdwMldGIdmGTKNAMO4r-_qfIWit2Fe04S7h26YAlq2I6KURN7I0arxfKnWq83lQFGJwae4Stoj7k9i7sdPsGQJ7flmTwmaYes1zBLu8CMYt_wMZ8KaRwPnhqNTvq9x3785szQ6TKH59UtiS0NYQVMsby1pffdSFUsvRKTgbqMli6YvE4Lj6KmwaLSzjoNEeoL-pFWgElDk6WDWmOif-nXYR-RX-HjD9fDdho)


## Live demo

You can try out a live version [here](https://panjianning.com/puml/).

## Setup
```bash
npm install -g global cross-env
npm install
```

## Static Deployment

```bash
npm run build
```

The dist directory contains the generated static files.

Note: If you want to use the root directory, edit the `kit.paths.base` variable in svelte.config.js and replace
`'/puml/'` with `''` in app.html.


## Development

**Edit app.html first: rplace`'/puml/'` with `''`**

``` bash
npm run dev
```

Then open http://localhost:3000
