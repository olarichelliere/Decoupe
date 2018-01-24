<?php

class MaterialController

{
    private $model;

    public function __construct($model)
    {
        $this->model = $model;
    }

    public function getAll()
    {
        return $this->model->getAll();
    }

    public function getOne($id)
    {
        return $this->model->getOne($id);
    }

    public function update($id,$payload){
/*
        if (!array_key_exists('name', $payload)) {
            throw new Exception('`name` should be provided!', 400);
        } elseif (!array_key_exists('price', $payload)) {
            throw new Exception('`price` should be provided!', 400);
        }
*/
        return $this->model->update($id,$payload);
    }

    public function create($payload)
    {
        /*
        if (!array_key_exists('year', $payload)) {
            throw new Exception('`year` should be provided!', 400);
        }elseif (!array_key_exists('month', $payload)) {
            throw new Exception('`month` should be provided!', 400);
        }elseif (!array_key_exists('month_number', $payload)) {
            throw new Exception('`month_number` should be provided!', 400);
        }
        */
        $newId= $this->model->create($payload);
        return $this->model->getOne($newId);
    }

    public function delete($id){
        
        $this->model->delete($id);
    }

    public function getAllWithFilters($id, $filters) {

        if (array_key_exists('thickness_id', $filters)) {
           

            $thicknessId = $filters['thickness_id'];
            $thicknessId = intval($thicknessId);

            if ($thicknessId == 0) {
                throw new Exception('Invalid Thickness. ', 400);
            }

            return $this->model->getFilteredByThickness($id, $thicknessId);
            
        }elseif(array_key_exists('searchTXT', $filters)){

            $searchTXT = $filters['searchTXT'];

            return $this->model->getFilteredByTXT($searchTXT);
        }
    }
   
}
