# VAV-SequenceOfOperation
Variable Air Volume(VAV) is an air conditioning system that automaticlly adjusts the air supply based on indoor demand changes. It can regulate the indoor temperature by adjusting the air supply volume.

Here is VAV sequence of operation:
Air supplied from air handle unit to the VAV, and the VAV adjusts the airflow volume based on the required airflow for the temperature, before the air is finally deliverd to the corresponding room. Assume that primary air supply is cold air.

  [1]current room temperature `T` (collected by temperature sensors)
  [2]room temperature setpoint `Ts` (set up by users)
  [3]caculate the air supply:
     if current room temperature `T` is lower than the setpoint `Ts`, we should increase the room temperature, so we need to decrease the cold air supply. In the opposite situation, if current room temperature `T` is higher than the setpoint `Ts`, we should decrease the room temperature, so we need to increase the cold air supply.
  [4]airflow setpoint(`SA`)
     (maximum air supply `SAmax` and minimum air supply `SAmin`):
     if we need to increase the air supply, we increase the airflow setpoint; if we need to decreasae the air supply, we decrease the airflow setpoint.
     VAV controller continuously monitors temperature changes and adjusts the air supply in real-time to maintain a stable room temperature.
  [5]current airflow(`A`)
     adjust the airflow damper:
     if current airflow(`A`) lower than the airflow setpoint(`SA`), VAV controller increase the damper's opening, if current airflow(`A`) higher than the airflow setpoint, VAV controller decrease the damper's openning until the current airflow(`A`) is maintain the airflow setpoint(`SA`).
  [6]relation between the airflow setpoint's rate of adjustment and the difference temperature for the demand changes:
     airflow setpoint changed rate(`R`): every minute changed 10 CFM? = `SDP` * `∆T`



