const statusColors = {
  name: 'statusColors',
  statusColor(status) {
    let color =''
    if(status === 'Delivered' || status === 'تم التوصيل'){
        color='text_status--green'
    }
    if(status === 'Whole refunded' || status === "تم إرجاعه كليا"){
        color='text_status--red'
    }
    if(status === 'partially refunded' | status === "تم إرجاعه جزئيا"){
        color='text_status--orange'
    }
    return color;
  }
}
export default ({
  app
}, inject) => {
  inject('statusColors', statusColors)
}
