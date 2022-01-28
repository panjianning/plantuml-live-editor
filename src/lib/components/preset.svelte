<script lang="ts">
	import { updateCode } from '$lib/util/state';
	import Card from '$lib/components/card/card.svelte';

	const samples = {
		'Flow Chart': `@startuml

!theme sketchy-outline

(*) --> "Initialization"

if "Some Test" then
  -->[true] "Some Activity"
  --> "Another activity"
  -right-> (*)
else
  ->[false] "Something else"
  -->[Ending process] (*)
endif
@enduml`,
		'Class Diagram': `@startuml

!theme sketchy-outline

class A {
{static} int counter
+void {abstract} start(int timeoutms)
+void {abstract} start(Duration timeout)
}
note left of A::counter
  This member is annotated
end note
note right of A::"start(int timeoutms)"
  This method with int
end note
note right of A::"start(Duration timeout)"
  This method with Duration
end note
@enduml
`,
		'State Diagram': `@startuml

[*] --> State1
State1 --> [*]
State1 : this is a string
State1 : this is another string

State1 -> State2
State2 --> [*]

@enduml
`,
		'Gantt Chart': `@startgantt
[foo] lasts 21 days
[foo] is 40% completed
[bar] lasts 30 days and is 10% complete
@endgantt
`,
		'ER Diagram': `@startuml
Entity01 }|..|| Entity02
Entity03 }o..o| Entity04
Entity05 ||--o{ Entity06
Entity07 |o--|| Entity08
@enduml
`,
		'Usecase diagram': `@startuml
skinparam actorStyle awesome
:User: --> (Use)
"Main Admin" as Admin
"Use the application" as (Use)
Admin --> (Admin the application)
@enduml
`,
    'Object diagram': `@startuml
object London

map CapitalCity {
 UK *-> London
 USA => Washington
 Germany => Berlin
}
@enduml
`,
    'Deployment diagram': `@startuml

cloud cloud1
cloud cloud2
cloud cloud3
cloud cloud4
cloud cloud5
cloud1 -0- cloud2
cloud1 -0)- cloud3
cloud1 -(0- cloud4
cloud1 -(0)- cloud5

@enduml
`,
    'Component diagram':`@startuml

package "Some Group" {
  HTTP - [First Component]
  [Another Component]
}

node "Other Groups" {
  FTP - [Second Component]
  [First Component] --> FTP
}

cloud {
  [Example 1]
}


database "MySql" {
  folder "This is my folder" {
    [Folder 3]
  }
  frame "Foo" {
    [Frame 4]
  }
}


[Another Component] --> [Example 1]
[Example 1] --> [Folder 3]
[Folder 3] --> [Frame 4]

@enduml
`
	};

	const loadSampleDiagram = (diagramType: string): void => {
		updateCode(samples[diagramType], true, true);
	};
</script>

<Card title="Sample Diagrams" isOpen={false}>
	<div class="flex gap-2 flex-wrap p-2">
		{#each Object.keys(samples) as sample}
			<button class="btn btn-primary normal-case btn-sm" on:click={() => loadSampleDiagram(sample)}
				>{sample}</button>
		{/each}
	</div>
</Card>
