const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("movie");
const seats = document.querySelectorAll('.seat:not(.reserved)');

  GetfromLocalStorage();
  CalculateTotal();

  container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") &&
      !e.target.classList.contains("reserved")
    ) {
      e.target.classList.toggle("selected");
    }
     CalculateTotal();
 
  });

select.addEventListener("change", function (e) {
  CalculateTotal();
});

function CalculateTotal() {
  const selectedSeats = container.querySelectorAll(".seat.selected");
  
  const selectedSeatArr = [];
  const seatArr = [];
  selectedSeatArr.push(...selectedSeats);
  seatArr.push(...seats);

  let selectedseatindexs = selectedSeatArr.map(function(seat){
    return seatArr.indexOf(seat)
  });
  saveToLocalStorage(selectedseatindexs);
  
 
  let SeatSelectedCount = selectedSeats.length;
  count.innerText = SeatSelectedCount;
  amount.innerText = SeatSelectedCount * select.value;
  

  
}
function GetfromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !=null && selectedSeats.length > 0){
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedmovieindex = localStorage.getItem('selectedMovieIndex');
  
    if(selectedmovieindex != null){
        select.selectedIndex = selectedmovieindex;
    }
}
function saveToLocalStorage(index) {
    localStorage.setItem('selectedSeats',JSON.stringify(index))
    localStorage.setItem('selectedMovieIndex',select.selectedIndex)
}
