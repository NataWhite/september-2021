User Api

## WebSocket

**HOST**: `http://localhoct:3005`

---

### Listen for join in room

---

Event: `join-in-room`


Data:
|Property | Description |
|----------------|------------------------|
|`token` | Auth token of user |
|`time` | Time of login |
|`id` | Id of room |


Examlpe:
```angular2html
token: sdflfkgt-dsfdg'gfgf
time: 2022-09-23
id: dsfdsf-3454sddf-fddfg
```


---

### Listen for join in chat

---

Event: `join-in-chat`


Data:
|Property | Description |
|----------------|------------------------|
|`token` | Auth token of user |
|`time` | Time of login |
|`id` | Id of chat |

