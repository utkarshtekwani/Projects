'''Importing libraries such as paramiko, gzip, time'''
import time
import gzip
import os
import paramiko
import pandas as pd



# SSH connection
def  initiate_ssh_connection( username = 'varun_linux', password = "GH#45@564", hostname = 'localhost', port = 22):
    '''Establishing an  SSH connection
    Atr:
        ssh : paramiko.SSHClient
        username
        password
        hostname
        port
    Returns:
        A connection to ssh 
'''
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(hostname=hostname, port=port, username=username, password=password)
    
    return ssh

# get_remote_files
def  get_remote_files(ssh:paramiko.SSHClient, path:str):
    ''' getting files  from remote server
    Args:
        path
        ssh
    Returns:
        reader(a command for displaying output)
    '''

    stdin, stdout, stderr = ssh.exec_command(f'ls {path}')
    
    files = stdout.read().decode('utf-8')

    return files
def  Download_remote_files( ssh:paramiko.SSHClient, remote_file, local_file,):

    '''Downloads a file from remote server and transfer to local file
    Args:
        ssh
        remote_file
        local_file
    Return:
        A '''
    sftp = ssh.open_sftp()
    try:
        with sftp.open(remote_file, 'rb') as remotefile:

            reader_file = remotefile.read()
            new_file = gzip.decompress(reader_file)

            with open(local_file, 'wb') as writer:
                writer.write(new_file)

        return True
    
    except PermissionError:
        print("permission error")
    
    except paramiko.SSHException:
        print("network error")

def save_filtered_chunk(filtered_chunk, output_file = "C:/Users/Asus/booker.csv"):
    """
    Saves the filtered chunk to a CSV file.
    Appends if the file already exists.
    """
    filtered_chunk.to_csv(
        output_file,
        mode='a',        # append mode
        index=False,     # don't write row numbers
        header=not pd.io.common.file_exists(output_file)  # write header only if file doesn't exist
    )

def filter_local_csv_to_df():
   
    
    reader = pd.read_csv(
    "C:/Users/Asus/Remote.csv",
    header=None,
    sep=';',
    chunksize=100,  
    dtype=str,
    iterator=True
)
    rows = reader.get_chunk()  # get the next chunk
    try:
        while not rows.empty:


            success_mask = (rows.iloc[:,11] == '1') & (rows.iloc[:,12] == '100')
            attach_mask = (rows.iloc[:,6] == '1')
            detach_mask = rows.iloc[:,6].isin(['6','7','8'])
            final_mask = success_mask & (attach_mask | detach_mask)
            filtered_chunk = rows.loc[final_mask]
            cols_to_keep = [3,4,5,6,7,11,12,15,16,17,18,20,22,32,37,40,278]
            filtered_chunk = filtered_chunk.iloc[:, cols_to_keep]
            save_filtered_chunk(filtered_chunk, output_file)
            rows = reader.get_chunk()
    except StopIteration as s:
        print(s)





# Print only the first row

    
ssh = initiate_ssh_connection(
    username='varun_linux',
    password='GH#45@564',
    hostname='localhost',
    port=22
)
files = get_remote_files(ssh, path='/mnt/c/Users/Asus/Downloads')
remote_file = "/mnt/c/Users/Asus/Downloads/pcmd-sample-data-file.MMEpcmd.gz"
local_file = "C:/Users/Asus/Remote.csv"


Download_remote_files( ssh, remote_file, local_file)





    







    


 

        







    



    
    




        


    


            



    
    

    

    



        


 