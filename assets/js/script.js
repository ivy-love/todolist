document.addEventListener('DOMContentLoaded', function() {
    // 버튼, 입력란, 목록 요소 가져오기
    let addBtn = document.getElementById("addBtn");
    let input = document.getElementById("inputBox");
    let ul = document.getElementById("taskWrap");
    
    let idCounter = 1; // 아이템 ID 카운터
    
    
    // 커서 깜빡임 함수
    function focus() {
        input.focus();
    };
    
    focus(); // 기본 커서 깜빡임
    
    // 할 일 추가하는 함수
    function addTodo() {
        if(input.value == ''){
            alert("할 일을 입력하세요!") // input 값이 비어있는 경우 경고 메시지 출력
            focus();
        } else {
            // 새로운 li, input, label, button 만들기
            const newList = document.createElement("li");
            const chkBox = document.createElement('input');
    
            // 웹 접근성을 위한 id 속성 및 카운터 추가
            chkBox.setAttribute("id", 'newList' + idCounter);
    
            chkBox.type = 'checkbox';
            
            const addLabel = document.createElement('label');
    
            // 웹 접근성을 위한 for 속성 및 카운터 추가
            addLabel.setAttribute("for", 'newList' + idCounter);
            addLabel.innerText = input.value;
    
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.innerText = '지우기';
    
            // CSS 제어를 위한 id 속성 추가
            deleteBtn.setAttribute("id", 'deleteBtn');
    
            const line = document.createElement('hr');
    
            // CSS 제어를 위한 class 속성 추가
            line.setAttribute("class", 'line');
    
    
            // 새로운 리스트에 요소 추가
            ul.prepend(newList);
            newList.append(chkBox);
            newList.append(addLabel);
            newList.append(deleteBtn);
            newList.append(line);
    
            // input 값 초기화
            input.value = null;
    
            // 아이템 ID 카운터 증가
            idCounter++;
        
            // 체크박스 상태 변경 시 텍스트 스타일 조절
            function addLine(e) {
                if(e.currentTarget.checked) {
                    addLabel.style.textDecoration = 'line-through';
                    addLabel.style.fontStyle = 'italic';
                    addLabel.style.fontWeight = '100';
                    addLabel.style.color = '#aaa';
                } else {
                    addLabel.style.textDecoration = 'none';
                    addLabel.style.fontStyle = 'normal';
                    addLabel.style.fontWeight = '400';
                    addLabel.style.color = '#333';
                };
            };
            chkBox.addEventListener('change', addLine);
            
            // 지우기 버튼 클릭 시 해당 리스트 아이템 제거
            deleteBtn.addEventListener('click', function() {
                ul.removeChild(newList);
            });
            focus();
        };
    };

    // localstorage에 할 일 리스트 저장, #taskWrap > label
   function saveItems() {
        addTodo();

        const saveItem = [];
        const list = document.querySelector('#taskWrap label').textContent;

        saveItem.push(list);
        // console.log(JSON.stringify(saveItem))
        localStorage.setItem('saved-item', JSON.stringify(saveItem));
       
    // console.log(saveItem)
    }

    // function getItem() {
    //     saveItems();
    //     const savedTodoList = localStorage.getItem('saved-items');
    //     console.log(savedTodoList);
    //     // saveItem.push(list);
    // }
    
   // 엔터 키 눌렀을 때 할 일 함수 호출
   function enterList(e) {
       if(e.keyCode === 13) {
        saveItems();
        //    getItem();
           e.preventDefault();
        };
    };
    
    // 전체 삭제
    let cla = document.querySelector('#clearAll');
    function clearAll(){
        if(confirm("정말 삭제하시겠습니까?")) {
            const li = document.querySelectorAll('#taskWrap li');
            for(let i = 0; i < li.length; i++) {
                li[i].remove();
            };
            focus();
        } else {
            return false;
        } 
    };
    
    input.addEventListener('keypress', enterList);       
    cla.addEventListener('click', clearAll);
    addBtn.addEventListener('click', addTodo);
});
